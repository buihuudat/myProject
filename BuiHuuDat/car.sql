-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 08, 2021 at 04:36 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zadmin_car2`
--

-- --------------------------------------------------------

--
-- Table structure for table `bao_hiem`
--

DROP TABLE IF EXISTS `bao_hiem`;
CREATE TABLE IF NOT EXISTS `bao_hiem` (
  `ID_bao_hien` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ID_xe_da_ban` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ID_cong_ty_bao_hiem` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_bat_dau_chinh_sach` date DEFAULT NULL,
  `ngay_ket_thuc_chinh_sach` date DEFAULT NULL,
  `thanh_toan_hang_thang` decimal(19,4) DEFAULT NULL,
  PRIMARY KEY (`ID_bao_hien`),
  KEY `ID_xe_da_ban` (`ID_xe_da_ban`),
  KEY `ID_cong_ty_bao_hiem` (`ID_cong_ty_bao_hiem`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `bao_hiem`
--

INSERT INTO `bao_hiem` (`ID_bao_hien`, `ID_xe_da_ban`, `ID_cong_ty_bao_hiem`, `ngay_bat_dau_chinh_sach`, `ngay_ket_thuc_chinh_sach`, `thanh_toan_hang_thang`) VALUES
('BH011', 'XDB011', 'CTB011', '2015-05-04', NULL, NULL),
('BH010', 'XDB010', 'CTB010', '2011-02-04', NULL, NULL),
('BH009', 'XDB009', 'CTB009', '2021-05-06', NULL, NULL),
('BH008', 'XDB008', 'CTB008', '2017-03-04', NULL, NULL),
('BH007', 'XDB007', 'CTB007', '2021-05-06', NULL, NULL),
('BH006', 'XDB006', 'CTB006', '2021-06-05', NULL, NULL),
('BH005', 'XDB005', 'CTB005', '2019-05-06', NULL, NULL),
('BH004', 'XDB004', 'CTB004', '2017-05-06', NULL, NULL),
('BH003', 'XDB003', 'CTB003', '2016-02-05', NULL, NULL),
('BH002', 'XDB002', 'CTB002', '2011-07-12', NULL, NULL),
('BH001', 'XDB001', 'CTB001', '2010-06-12', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cong_ty_bao_hiem`
--

DROP TABLE IF EXISTS `cong_ty_bao_hiem`;
CREATE TABLE IF NOT EXISTS `cong_ty_bao_hiem` (
  `ID_cong_ty_bao_hiem` varchar(10) NOT NULL,
  `ten_cong_ty_bao_hiem` varchar(20) NOT NULL,
  `quoc_gia` varchar(20) DEFAULT NULL,
  `thong_tin_them` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_cong_ty_bao_hiem`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cong_ty_bao_hiem`
--

INSERT INTO `cong_ty_bao_hiem` (`ID_cong_ty_bao_hiem`, `ten_cong_ty_bao_hiem`, `quoc_gia`, `thong_tin_them`) VALUES
('CTB001', 'Manulife', 'Canada', NULL),
('CTB002', 'Dai-ichi Life', 'Nhật Bản', NULL),
('CTB003', 'Cathay Life', 'Đài Loan', NULL),
('CTB004', 'Aviva Việt Nam', 'Việt Nam', NULL),
('CTB005', 'Bảo Việt Nhân Thọ ', 'Việt Nam', NULL),
('CTB006', 'Bảo hiểm Hanwha Life', 'Hàn Quốc', NULL),
('CTB007', 'Chubb Life VN', 'Mỹ', NULL),
('CTB008', 'Bảo hiểm Sun Life', 'Canada', NULL),
('CTB009', 'Fubon Việt Nam', 'Đài Loan', NULL),
('CTB010', 'Bảo hiểm AIA', 'Hồng Kông', NULL),
('CTB011', 'Prudential Việt Nam', 'Anh Quốc', NULL),
('CTB012', 'Bảo hiểm FWD ViệtNam', 'Hồng Kông', NULL),
('CTB013', 'MB Ageas Life', 'Việt Nam', NULL),
('CTB014', 'Prévoir Việt Nam', 'Pháp', NULL),
('CTB015', 'BIDV Metlife', 'Việt Nam', NULL),
('CTB016', 'Phú Hưng Life', 'Việt Nam', NULL),
('CTB017', 'Vietcombank-Cardif', 'Việt Nam', NULL),
('CTB018', 'Moncover Việt Nam ', 'Việt Nam', NULL),
('d', 'd', 'd', 'd');

-- --------------------------------------------------------

--
-- Table structure for table `cong_ty_tai_chinh`
--

DROP TABLE IF EXISTS `cong_ty_tai_chinh`;
CREATE TABLE IF NOT EXISTS `cong_ty_tai_chinh` (
  `ID_cong_ty_tai_chinh` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ten_cong_ty_tai_chinh` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `sdt` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thong_tin_them` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_cong_ty_tai_chinh`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cong_ty_tai_chinh`
--

INSERT INTO `cong_ty_tai_chinh` (`ID_cong_ty_tai_chinh`, `ten_cong_ty_tai_chinh`, `sdt`, `thong_tin_them`) VALUES
('CTT001', 'Home Credit', '1900633633', NULL),
('CTT002', 'HD SAISON', '1900558854', NULL),
('CTT003', 'Công ty Tài chính TNHH Một thành viên Lotte Finance', '19006866', NULL),
('CTT004', 'Công ty Tài chính MTV MB SHINSEI', '0247108688', NULL),
('CTT005', 'Công ty Tài chính TNHH MTV Bưu Điện', '1900232356', NULL),
('CTT006', 'Công ty Tài chính Ngân hàng Việt Nam Thịnh Vượng', '028391555', NULL),
('CTT007', 'Công ty Tài chính Cổ phần tập đoàn Tima', '1900633688', NULL),
('CTT008', 'Công ty Tài chính Shinhan', '190 545449', NULL),
('CTT009', 'Công ty Tài chính TNHH Thương mại ACS Việt Nam', '02854453800', NULL),
('CTT010', 'Công ty Tài chính TNHH MTV Mirae Asset Việt Nam', '02899997577', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dac_diem_xe`
--

DROP TABLE IF EXISTS `dac_diem_xe`;
CREATE TABLE IF NOT EXISTS `dac_diem_xe` (
  `ID_dac_diem` varchar(10) NOT NULL,
  `mo_ta_tinh_nang` char(200) DEFAULT NULL,
  PRIMARY KEY (`ID_dac_diem`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dac_diem_xe`
--

INSERT INTO `dac_diem_xe` (`ID_dac_diem`, `mo_ta_tinh_nang`) VALUES
('DD007', 'Phanh tay điện tử/ cảm biến áp suất lốp'),
('DD006', 'Hệ thống chống bó cứng phanh ABS'),
('DD005', 'Túi khí trung tâm'),
('DD004', 'Tự động đỗ xe, ra khỏi bãi đỗ'),
('DD003', 'Camera 360 độ'),
('DD002', 'AEB quét giao lộ'),
('DD001', 'Quan sát điểm mù'),
('DD008', 'Hệ thống hỗ trợ đỗ xe'),
('DD009', 'Thông tin trên kính chắn gió'),
('DD010', 'Kiểm soát hành trình thích ứng');

-- --------------------------------------------------------

--
-- Table structure for table `dac_diem_xe_ban`
--

DROP TABLE IF EXISTS `dac_diem_xe_ban`;
CREATE TABLE IF NOT EXISTS `dac_diem_xe_ban` (
  `ID_xe_ban` varchar(10) NOT NULL,
  `ID_dac_diem` varchar(10) NOT NULL,
  PRIMARY KEY (`ID_xe_ban`,`ID_dac_diem`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dac_diem_xe_ban`
--

INSERT INTO `dac_diem_xe_ban` (`ID_xe_ban`, `ID_dac_diem`) VALUES
('d', 'd'),
('XB001', 'DD001'),
('XB001', 'DD004'),
('XB001', 'DD010'),
('XB002', 'DD002'),
('XB002', 'DD007'),
('XB003', 'DD003'),
('XB003', 'DD005'),
('XB004', 'DD004'),
('XB004', 'DD007'),
('XB004', 'DD008'),
('XB005', 'DD002'),
('XB005', 'DD005'),
('XB006', 'DD003'),
('XB006', 'DD006'),
('XB007', 'DD004'),
('XB007', 'DD007'),
('XB008', 'DD008'),
('XB008', 'DD009'),
('XB009', 'DD009'),
('XB009', 'DD010'),
('XB010', 'DD001'),
('XB010', 'DD008'),
('XB010', 'DD009'),
('XB011', 'DD002'),
('XB011', 'DD008'),
('XB011', 'DD009'),
('XB011', 'DD010'),
('XB012', 'DD002'),
('XB012', 'DD006'),
('XB013', 'DD003'),
('XB013', 'DD004'),
('XB014', 'DD004'),
('XB015', 'DD005'),
('XB016', 'DD006'),
('XB016', 'DD009'),
('XB017', 'DD002'),
('XB017', 'DD007'),
('XB018', 'DD008'),
('XB018', 'DD010'),
('XB019', 'DD006'),
('XB019', 'DD009'),
('XB020', 'DD008'),
('XB020', 'DD009'),
('XB020', 'DD010'),
('XB021', 'DD001'),
('XB021', 'DD005'),
('XB021', 'DD009'),
('XB021', 'DD010'),
('XB022', 'DD007'),
('XB023', 'DD005'),
('XB024', 'DD008'),
('XB025', 'DD002');

-- --------------------------------------------------------

--
-- Table structure for table `dia_chi`
--

DROP TABLE IF EXISTS `dia_chi`;
CREATE TABLE IF NOT EXISTS `dia_chi` (
  `ID_dia_chi` varchar(10) NOT NULL,
  `ID_khach_hang` varchar(10) NOT NULL,
  `dia_chi_1` varchar(50) DEFAULT NULL,
  `dia_chi_2` varchar(50) DEFAULT NULL,
  `dia_chi_3` varchar(50) DEFAULT NULL,
  `quan_tinh` varchar(10) DEFAULT NULL,
  `thanh_pho_thi_tran` varchar(20) DEFAULT NULL,
  `quoc_gia` varchar(10) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `dia_chi_khac` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_dia_chi`),
  KEY `ID_khach_hang` (`ID_khach_hang`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dia_chi`
--

INSERT INTO `dia_chi` (`ID_dia_chi`, `ID_khach_hang`, `dia_chi_1`, `dia_chi_2`, `dia_chi_3`, `quan_tinh`, `thanh_pho_thi_tran`, `quoc_gia`, `zip_code`, `dia_chi_khac`) VALUES
('DC001', 'KH001', 'QL14', NULL, NULL, 'Dak Nong', NULL, 'Viet Nam', '00213', NULL),
('DC002', 'KH002', '25/8 Nguyen Oanh', NULL, NULL, 'Go Vap', 'HCM', 'Viet Nam', '001110', NULL),
('DC003', 'KH003', '26/9 Nguyen Oanh', NULL, NULL, 'Go Vap', 'HCM', 'Viet Nam', '001112', NULL),
('DC004', 'KH004', 'Thon 8', NULL, NULL, 'Dak Nong', NULL, 'Viet Nam', '01213', NULL),
('DC005', 'KH005', '23 Ap 3', NULL, NULL, 'Binh Dinh', NULL, 'Viet Nam', '01113', NULL),
('DC006', 'KH006', '12 Le Loi', NULL, NULL, 'Binh Thuan', 'Phan Thiet', 'Viet Nam', '00113', NULL),
('DC007', 'KH007', '43 Quang Trung', NULL, NULL, 'Ben Tre', 'Ben Tre', 'Viet Nam', '00215', NULL),
('DC008', 'KH008', 'Nga 6', NULL, NULL, 'Dak Lak', 'BMT', 'Viet Nam', '00913', NULL),
('DC009', 'KH009', '12/2 Quan Trung', NULL, NULL, 'Go Vap', 'HCM', 'Viet Nam', '00003', NULL),
('DC010', 'KH010', '12 Nguyen Trai', NULL, NULL, NULL, 'Da Nang', 'Viet Nam', '10213', NULL),
('DC011', 'KH011', 'Quang Truong', NULL, NULL, 'Go Vap', 'HCM', 'Viet Nam', '11213', NULL),
('DC012', 'KH012', '12 Le Loi', NULL, NULL, 'Ba Dinh', 'Ha Noi', 'Viet Nam', '00233', NULL),
('DC013', 'KH013', 'Hai Bac', NULL, NULL, 'Hai Hau', 'Nam Dinh', 'Viet Nam', '09213', NULL),
('DC014', 'KH014', NULL, NULL, NULL, 'Tay Ninh', NULL, 'Viet Nam', NULL, NULL),
('DC015', 'KH015', '24 Hai Ba Trung', NULL, NULL, 'Q3', 'HCM', 'Viet Nam', '02213', NULL),
('DC016', 'KH016', '26 Tran Duy Hung', NULL, NULL, NULL, 'Ha Noi', 'Viet Nam', '00413', NULL),
('DC017', 'KH013', '2 Quang Trung', NULL, NULL, 'Dak Nong', NULL, 'Viet Nam', NULL, NULL),
('DC018', 'KH018', '142/6', NULL, NULL, 'Dong Nai', 'Bien Hoa', 'Viet Nam', '00343', NULL),
('DC019', 'KH019', '14 Van Dan', NULL, NULL, 'Q4', 'HCM', 'Viet Nam', '00273', NULL),
('DC020', 'KH020', NULL, NULL, NULL, 'Hai Hau', 'Nam Dinh', 'Viet Nam', '00343', NULL),
('DC021', 'KH020', '12 Quang Trung', NULL, NULL, 'Dak Nong', NULL, 'Viet Nam', NULL, NULL),
('DC022', 'KH019', '14 Le Loi', NULL, NULL, 'Q3', 'HCM', 'Viet Nam', NULL, NULL),
('DC023', 'KH017', '786 Nguyen Kiem', NULL, NULL, 'Go Vap', 'HCM', 'Viet Nam', '12043', NULL),
('DC024', 'KH015', '123 Le Loi', NULL, NULL, 'Tan Binh', 'HCM', 'Viet Nam', NULL, NULL),
('DC025', 'KH017', '23 Quang Trung', NULL, NULL, 'Hoan Kiem', 'Ha Noi', 'Viet Nam', '12343', NULL),
('FD', 'KH003', 'SDAF', 'À', 'ADF', 'ADF', 'ADF', 'ADF', '123', 'F');

-- --------------------------------------------------------

--
-- Table structure for table `hoa_don_thanh_toan`
--

DROP TABLE IF EXISTS `hoa_don_thanh_toan`;
CREATE TABLE IF NOT EXISTS `hoa_don_thanh_toan` (
  `ID_hoa_don` varchar(10) NOT NULL,
  `ID_xe_da_ban` varchar(10) NOT NULL,
  `ID_khach_hang` varchar(10) NOT NULL,
  `ID_nhan_vien` varchar(10) NOT NULL,
  `ma_thanh_toan` varchar(10) DEFAULT NULL,
  `ngay_thanh_toan` date DEFAULT NULL,
  `han_thanh_toan` date DEFAULT NULL,
  `so_tien_thanh_toan` decimal(19,4) DEFAULT NULL,
  PRIMARY KEY (`ID_hoa_don`),
  KEY `ID_xe_da_ban` (`ID_xe_da_ban`),
  KEY `ID_khach_hang` (`ID_khach_hang`),
  KEY `ID_nhan_vien` (`ID_nhan_vien`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hoa_don_thanh_toan`
--

INSERT INTO `hoa_don_thanh_toan` (`ID_hoa_don`, `ID_xe_da_ban`, `ID_khach_hang`, `ID_nhan_vien`, `ma_thanh_toan`, `ngay_thanh_toan`, `han_thanh_toan`, `so_tien_thanh_toan`) VALUES
('HD001', 'XDB001', 'KH001', 'NV001', 'TT001', '2020-12-03', NULL, '1000000000.0000'),
('HD002', 'XDB002', 'KH002', 'NV002', 'TT002', '2019-12-05', NULL, '900000000.0000'),
('HD003', 'XDB003', 'KH003', 'NV003', 'TT001', '2018-05-03', NULL, '950000000.0000'),
('HD004', 'XDB004', 'KH004', 'NV004', 'TT001', '2016-04-03', NULL, '1200000000.0000'),
('HD005', 'XDB005', 'KH005', 'NV005', 'TT002', '2018-03-04', NULL, '960000000.0000'),
('HD006', 'XDB006', 'KH006', 'NV006', 'TT002', '2010-05-04', NULL, '980000000.0000'),
('HD007', 'XDB007', 'KH007', 'NV007', 'TT002', '2017-12-03', NULL, '230000000.0000'),
('HD008', 'XDB008', 'KH008', 'NV006', 'TT001', '2018-05-04', NULL, '800000000.0000'),
('HD009', 'XDB009', 'KH009', 'NV005', 'TT001', '2010-11-23', NULL, '990000000.0000'),
('HD010', 'XDB010', 'KH010', 'NV004', 'TT001', '2018-11-23', NULL, '900000000.0000'),
('HD011', 'XDB011', 'KH011', 'NV001', 'TT001', '2015-12-03', NULL, '1100000000.0000'),
('HD012', 'XDB012', 'KH012', 'NV002', 'TT002', '2019-10-03', NULL, '900000000.0000'),
('HD013', 'XDB013', 'KH013', 'NV003', 'TT001', '2018-12-03', NULL, '950000000.0000'),
('HD014', 'XDB014', 'KH014', 'NV004', 'TT001', '2016-12-03', NULL, '1200000000.0000'),
('HD015', 'XDB015', 'KH015', 'NV005', 'TT002', '2018-12-03', NULL, '960000000.0000'),
('HD016', 'XDB016', 'KH016', 'NV006', 'TT002', '2010-12-03', NULL, '980000000.0000'),
('HD017', 'XDB017', 'KH017', 'NV002', 'TT002', '2017-11-23', NULL, '230000000.0000'),
('HD018', 'XDB018', 'KH018', 'NV007', 'TT001', '2018-11-23', NULL, '800000000.0000'),
('HD019', 'XDB019', 'KH019', 'NV001', 'TT001', '2010-02-05', NULL, '990000000.0000'),
('HD020', 'XDB020', 'KH010', 'NV002', 'TT001', '2018-03-04', NULL, '900000000.0000'),
('HD021', 'XDB021', 'KH018', 'NV002', 'TT001', '2015-03-04', NULL, '1100000000.0000'),
('HD022', 'XDB022', 'KH019', 'NV005', 'TT001', '2018-05-03', NULL, '800000000.0000'),
('HD023', 'XDB023', 'KH020', 'NV006', 'TT001', '2010-03-04', NULL, '990000000.0000'),
('HD024', 'XDB024', 'KH020', 'NV006', 'TT001', '2018-05-03', NULL, '900000000.0000'),
('HD025', 'XDB025', 'KH020', 'NV007', 'TT001', '2015-12-03', NULL, '1100000000.0000'),
('d', 'd', 'd', 'd', 'd', '2021-01-01', '2021-01-02', '1.0000');

-- --------------------------------------------------------

--
-- Table structure for table `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `ID_khach_hang` char(10) NOT NULL,
  `ten` varchar(20) DEFAULT NULL,
  `tuoi` varchar(11) DEFAULT NULL,
  `sdt` varchar(10) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_khach_hang`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khach_hang`
--

INSERT INTO `khach_hang` (`ID_khach_hang`, `ten`, `tuoi`, `sdt`, `email`) VALUES
('KH001', 'Trần Triệu Vy', '20', '0989999999', 'trieuvy@gmail.com'),
('KH002', 'Trần Thanh Thảo', '21', '0982343434', 'thanhthao@gmail.com'),
('KH003', 'Đỗ Phương Trang', '21', '0989235454', 'trangdo@gmail.com'),
('KH004', 'Nguyễn Hữu Phước', '19', '0389765476', 'phuong3@gmail.com'),
('KH005', 'Lộc Fuho', '36', '0943435374', 'locfuho@gmail.com'),
('KH006', 'Nguyễn Đức Thịnh', '16', '0989546574', 'thinhga123@gmail.com'),
('KH007', 'Phạm Nguyễn Tường Vy', '20', '0984324343', 'heotv@gmail.com'),
('KH008', 'Trần Ngọc', '18', '0975847584', 'tranngoc@gmail.com'),
('KH009', 'Trương Gia Bội', '19', '0843438545', 'thithi@gmail.com'),
('KH010', 'Đoàn Thủy Tiên', '30', '0934354656', 'tien3@gmail.com'),
('KH011', 'Trần Quế Anh', '17', '0958475469', 'queanh@gmail.com'),
('KH012', 'Nguyễn Tiến Anh', '37', '0989435454', 'anh3@gmail.com'),
('KH013', 'Kiều Oanh', '16', NULL, 'oanh@gmail.com'),
('KH014', 'Trần Triêu Đô', '40', '0909994343', NULL),
('KH015', 'Đỗ Anh Duy', '26', NULL, NULL),
('KH016', 'Lê Xuân Mai', '49', '0989997232', NULL),
('KH017', 'Lê Ngọc Hân', '60', NULL, NULL),
('KH018', 'Bảo Trân', '39', NULL, 'baotran@gmail.com'),
('KH019', 'Lộc Văn Chiến', '67', NULL, NULL),
('KH020', 'Bùi Hữu Đạt', '20', '0987651000', 'dat54@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `loai_xe`
--

DROP TABLE IF EXISTS `loai_xe`;
CREATE TABLE IF NOT EXISTS `loai_xe` (
  `ma_loai_xe` varchar(10) NOT NULL,
  `mo_ta_xe` varchar(200) DEFAULT NULL,
  `nhien_lieu` varchar(50) DEFAULT NULL,
  `hop_so` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ma_loai_xe`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loai_xe`
--

INSERT INTO `loai_xe` (`ma_loai_xe`, `mo_ta_xe`, `nhien_lieu`, `hop_so`) VALUES
('LX001', 'Đỏ đen', 'Diesel', 'auto'),
('LX002', 'Xe 7 chỗ', 'Gasoline', 'tiptronic'),
('LX003', 'xe thể thao', 'Gas', 'mechanic'),
('LX004', 'mui trần', 'Come (Gas + Gasoline)', 'auto'),
('LX005', 'cánh dơi', 'Electric', 'tiptronic'),
('LX006', 'xe bán tải', 'Hybrid (Gasoline + Electric)', 'mechanic'),
('LX007', 'đa dụng', 'Electric', 'auto'),
('LX008', 'thể thao đa dụng', 'Gas', 'mechanic'),
('LX009', 'xe lai đa dụng', 'Diesel', 'auto'),
('LX010', 'xe sang', 'Diesel', 'mechanic'),
('LX011', 'xám đen', 'Hybrid (Gasoline + Electric)', 'tiptronic');

-- --------------------------------------------------------

--
-- Table structure for table `mua_cho_vay`
--

DROP TABLE IF EXISTS `mua_cho_vay`;
CREATE TABLE IF NOT EXISTS `mua_cho_vay` (
  `ID_cho_vay` varchar(10) NOT NULL,
  `ID_xe_da_ban` varchar(10) NOT NULL,
  `ID_cong_ty_tai_chinh` varchar(10) NOT NULL,
  `ngay_bat_dau_tra_no` date DEFAULT NULL,
  `ngay_key_thuc_tra_na` date DEFAULT NULL,
  `thong_tin_them` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_cho_vay`),
  KEY `ID_xe_da_ban` (`ID_xe_da_ban`),
  KEY `ID_cong_ty_tai_chinh` (`ID_cong_ty_tai_chinh`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mua_cho_vay`
--

INSERT INTO `mua_cho_vay` (`ID_cho_vay`, `ID_xe_da_ban`, `ID_cong_ty_tai_chinh`, `ngay_bat_dau_tra_no`, `ngay_key_thuc_tra_na`, `thong_tin_them`) VALUES
('CV011', 'XDB011', 'CTT003', '2016-03-03', NULL, NULL),
('CV010', 'XDB010', 'CTT002', '2018-02-04', NULL, NULL),
('CV009', 'XDB009', 'CTT001', '2015-04-05', NULL, NULL),
('CV008', 'XDB008', 'CTT008', '2020-04-05', NULL, NULL),
('CV007', 'XDB007', 'CTT007', '2016-04-05', NULL, NULL),
('CV006', 'XDB006', 'CTT006', '2020-05-04', NULL, NULL),
('CV005', 'XDB005', 'CTT005', '2021-05-04', NULL, NULL),
('CV004', 'XDB004', 'CTT004', '2011-02-04', NULL, NULL),
('CV003', 'XDB003', 'CTT003', '2015-04-05', NULL, NULL),
('CV002', 'XDB002', 'CTT002', '2012-04-05', NULL, NULL),
('CV001', 'XDB001', 'CTT001', '2010-05-07', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nhan_vien`
--

DROP TABLE IF EXISTS `nhan_vien`;
CREATE TABLE IF NOT EXISTS `nhan_vien` (
  `ID_nhan_vien` varchar(10) NOT NULL,
  `ten_nhan_vien` varchar(20) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` varchar(10) DEFAULT NULL,
  `dia_Chi` varchar(50) DEFAULT NULL,
  `sdt` varchar(10) DEFAULT NULL,
  `ngay_vao_lam` date DEFAULT NULL,
  `luong_co_ban` decimal(19,4) DEFAULT NULL,
  PRIMARY KEY (`ID_nhan_vien`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhan_vien`
--

INSERT INTO `nhan_vien` (`ID_nhan_vien`, `ten_nhan_vien`, `ngay_sinh`, `gioi_tinh`, `dia_Chi`, `sdt`, `ngay_vao_lam`, `luong_co_ban`) VALUES
('NV001', 'Nguyễn Thúy Kiều', '1992-02-01', 'Nữ', '234 Hai Ba Trưng Q3, TPHCM', '0934367343', '2015-12-03', '15000000.0000'),
('NV002', 'Nguyễn Đức Hải', '1990-02-12', 'Nam', '24 Hai Lê Lợi Q3, TPHCM', '0936367343', '2014-03-05', '17000000.0000'),
('NV003', 'Nguyễn Anh Duy', '1993-05-03', 'Nam', '234 Thống Nhất Phú Nhuận, TPHCM', '0934999343', '2010-02-03', '20000000.0000'),
('NV004', 'Nguyễn Thúy Nga', '1999-02-11', 'Nữ', '6 Đinh Bộ Lĩnh Bình Thạnh, TPHCM', '0834367343', '2009-02-04', '20000000.0000'),
('NV005', 'Phan Văn Hiếu', '1997-03-04', 'Nam', '23 Nam Kỳ Khởi Nghĩa, TPHCM', '0934354555', '2018-02-05', '9000000.0000'),
('NV006', 'Lương Gia Long', '1987-03-04', 'Nam', '2 Nguyễn Văn Công Gò Vấp, TPHCM', '0345454555', '2017-12-03', '10000000.0000'),
('NV007', 'Trần Ngọc Anh', '1999-12-03', 'Nam', '12 Phạm Văn Đồng, TPHCM', '0934234355', '2016-04-05', '12000000.0000');

-- --------------------------------------------------------

--
-- Table structure for table `nha_san_xuat`
--

DROP TABLE IF EXISTS `nha_san_xuat`;
CREATE TABLE IF NOT EXISTS `nha_san_xuat` (
  `ten_nsx` varchar(20) NOT NULL,
  `quoc_gia` varchar(10) DEFAULT NULL,
  `sdt` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`ten_nsx`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nha_san_xuat`
--

INSERT INTO `nha_san_xuat` (`ten_nsx`, `quoc_gia`, `sdt`) VALUES
('Toyota', 'Nhat Ban', '0999889999'),
('Ford', 'My', '0988889999'),
('Hyundai', 'Han Quoc', '0977889999'),
('Kia', 'Han Quoc', '0998889999'),
('Honda', 'Nhat Ban', '0999888899'),
('Chevrolet', 'My', '0999889977'),
('Lexus', 'Nhat Ban', '0999889779'),
('Mazda', 'Nhat Ban', '0999989899'),
('Nisan', 'Nhat Ban', '0999889988'),
('Isuzu', 'Nhat Ban', '0999886699'),
('Vinfast', 'Viet Nam', '0999889977');

-- --------------------------------------------------------

--
-- Table structure for table `so_thich_khach_hang`
--

DROP TABLE IF EXISTS `so_thich_khach_hang`;
CREATE TABLE IF NOT EXISTS `so_thich_khach_hang` (
  `ID_so_thich` varchar(10) NOT NULL,
  `ID_dac_diem` varchar(10) NOT NULL,
  `ID_khach_hang` varchar(10) NOT NULL,
  PRIMARY KEY (`ID_so_thich`),
  KEY `ID_dac_diem` (`ID_dac_diem`),
  KEY `ID_khach_hang` (`ID_khach_hang`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `so_thich_khach_hang`
--

INSERT INTO `so_thich_khach_hang` (`ID_so_thich`, `ID_dac_diem`, `ID_khach_hang`) VALUES
('ST001', 'DD001', 'KH001'),
('ST002', 'DD002', 'KH002'),
('ST003', 'DD003', 'KH003'),
('ST004', 'DD004', 'KH004'),
('ST005', 'DD005', 'KH005'),
('ST006', 'DD006', 'KH006'),
('ST007', 'DD007', 'KH006'),
('ST008', 'DD008', 'KH007'),
('ST009', 'DD009', 'KH008'),
('ST010', 'DD010', 'KH009'),
('ST011', 'DD010', 'KH010'),
('ST012', 'DD001', 'KH011'),
('ST013', 'DD001', 'KH011'),
('ST014', 'DD002', 'KH012'),
('ST015', 'DD003', 'KH013'),
('ST016', 'DD004', 'KH014'),
('ST017', 'DD005', 'KH015'),
('ST018', 'DD006', 'KH016'),
('ST019', 'DD007', 'KH016'),
('ST020', 'DD008', 'KH017'),
('ST021', 'DD009', 'KH018'),
('ST022', 'DD010', 'KH019'),
('ST023', 'DD010', 'KH020'),
('ST024', 'DD001', 'KH011'),
('ST025', 'DD001', 'KH008'),
('ST026', 'DD002', 'KH006'),
('ST027', 'DD003', 'KH008'),
('ST028', 'DD004', 'KH009'),
('ST029', 'DD005', 'KH003'),
('ST030', 'DD006', 'KH004'),
('ST031', 'DD007', 'KH005'),
('ST032', 'DD008', 'KH002'),
('ST033', 'DD009', 'KH003'),
('ST034', 'DD010', 'KH009'),
('ST035', 'DD010', 'KH011'),
('ST036', 'DD001', 'KH012'),
('d', 'd', 'd'),
('ST099', 'IDDD99', 'IDDD99'),
('ST0999', 'DD001', 'KH011'),
('ST089', 'DD001', 'KH002'),
('12', '12', '12'),
('ST0011', 'DD007', 'KH001'),
('DSF', 'DD007', 'KH002');

-- --------------------------------------------------------

--
-- Table structure for table `trang_thai_thanh_toan`
--

DROP TABLE IF EXISTS `trang_thai_thanh_toan`;
CREATE TABLE IF NOT EXISTS `trang_thai_thanh_toan` (
  `ma_thanh_toan` varchar(10) NOT NULL,
  `trang_thai_thanh_toan` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ma_thanh_toan`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trang_thai_thanh_toan`
--

INSERT INTO `trang_thai_thanh_toan` (`ma_thanh_toan`, `trang_thai_thanh_toan`) VALUES
('TT001', 0),
('TT002', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `gmail` text COLLATE utf8_unicode_ci NOT NULL,
  `permission` int(11) NOT NULL DEFAULT '0',
  `avartar` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `fullname`, `gmail`, `permission`, `avartar`) VALUES
('buihuudat', '356a192b7913b04c54574d18c28d46e6395428ab', 'Bui Huu Dat', 'dat54261001@gmail.com', 0, '51dbb8e21a54a814f06c7947c627a082.jpeg'),
('2', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', 'Nguyễn văn b', 'b@gmail.com', 1, '2bacc3845102c2dbd80790da12dca669.jpeg'),
('3', '08743582456b52abe1182f5a5a3e12b457ba28b8', 'khach hang a', 'kh@gmail.com', 2, '9a580a6dd0ac977d8fc5c34516b80cac.jpeg'),
('1', '17ba0791499db908433b80f37c5fbc89b870084b', 'Bui Huu Dat', 'dat54261001@gmail.com', 0, '0044df25ef370abc9b6becc8524d5359.jpeg'),
('matkhau11', 'aeb12849ae0498fcdcba0bb1afaa66670b474989', 'dat', 'dat@gmail.com', 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `xe_ban`
--

DROP TABLE IF EXISTS `xe_ban`;
CREATE TABLE IF NOT EXISTS `xe_ban` (
  `ID_xe_ban` varchar(10) NOT NULL,
  `ten_nsx` varchar(20) DEFAULT NULL,
  `ma_mo_hinh` varchar(10) DEFAULT NULL,
  `ma_loai_xe` varchar(10) DEFAULT NULL,
  `gia` decimal(19,4) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `ngay_mua` date DEFAULT NULL,
  `nam_dang_ki` int(11) DEFAULT NULL,
  `thong_tin_khac` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_xe_ban`),
  KEY `ma_mo_hinh` (`ma_mo_hinh`),
  KEY `ma_loai_xe` (`ma_loai_xe`),
  KEY `ten_nsx` (`ten_nsx`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `xe_ban`
--

INSERT INTO `xe_ban` (`ID_xe_ban`, `ten_nsx`, `ma_mo_hinh`, `ma_loai_xe`, `gia`, `so_luong`, `ngay_mua`, `nam_dang_ki`, `thong_tin_khac`) VALUES
('XB001', 'Toyota', 'MH001', 'LX001', '1000000000.0000', 2, '2020-02-03', NULL, NULL),
('XB002', 'Ford', 'MH002', 'LX002', '2000000000.0000', 5, '2020-05-07', NULL, NULL),
('XB003', 'Hyundai', 'MH003', 'LX003', '1600000000.0000', 6, '2010-11-12', NULL, NULL),
('XB004', 'Kia', 'MH004', 'LX004', '900000000.0000', 4, '2019-12-02', NULL, NULL),
('XB005', 'Honda', 'MH005', 'LX005', '860000000.0000', 1, '2016-12-03', NULL, NULL),
('XB006', 'Chevrolet', 'MH006', 'LX006', '1250000000.0000', 2, '2015-02-03', NULL, NULL),
('XB007', 'Lexus', 'MH007', 'LX007', '930000000.0000', 0, '2020-05-03', NULL, NULL),
('XB008', 'Mazda', 'MH008', 'LX008', '230000000.0000', 1, '2010-04-06', NULL, NULL),
('XB009', 'Nisan', 'MH009', 'LX009', '1200000000.0000', 3, '2021-07-05', NULL, NULL),
('XB010', 'Isuzu', 'MH010', 'LX010', '1500000000.0000', 5, '2018-06-03', NULL, NULL),
('XB011', 'Vinfast', 'MH011', 'LX011', '1050000000.0000', 3, '2020-05-03', NULL, NULL),
('XB012', 'Vinfast', 'MH011', 'LX011', '1060000000.0000', 6, '2020-11-12', NULL, NULL),
('XB013', 'Toyota', 'MH011', 'LX011', '1100000000.0000', 2, '2010-12-23', NULL, NULL),
('XB014', 'Ford', 'MH010', 'LX009', '2000000000.0000', 3, '2020-03-14', NULL, NULL),
('XB015', 'Hyundai', 'MH002', 'LX004', '1700000000.0000', 1, '2010-05-07', NULL, NULL),
('XB016', 'Kia', 'MH005', 'LX006', '980000000.0000', 4, '2009-05-06', NULL, NULL),
('XB017', 'Honda', 'MH006', 'LX004', '870000000.0000', 4, '2016-07-08', NULL, NULL),
('XB018', 'Chevrolet', 'MH007', 'LX001', '1200000000.0000', 2, '2013-08-05', NULL, NULL),
('XB019', 'Lexus', 'MH008', 'LX008', '950000000.0000', 5, '2020-09-04', NULL, NULL),
('XB020', 'Mazda', 'MH002', 'LX009', '220000000.0000', 5, '2012-04-06', NULL, NULL),
('XB021', 'Nisan', 'MH010', 'LX011', '1800000000.0000', 3, '2013-02-05', NULL, NULL),
('XB022', 'Isuzu', 'MH011', 'LX009', '1550000000.0000', 4, '2016-06-07', NULL, NULL),
('XB023', 'Vinfast', 'MH006', 'LX010', '1250000000.0000', 2, '2015-06-07', NULL, NULL),
('XB024', 'Vinfast', 'MH006', 'LX005', '1023000000.0000', 4, '2010-07-05', NULL, NULL),
('XB025', 'Vinfast', 'MH007', 'LX008', '923000000.0000', 1, '2017-07-07', NULL, NULL),
('1', '1', '1', '1', '1.0000', 1, '2021-01-01', 2021, '1');

-- --------------------------------------------------------

--
-- Table structure for table `xe_da_ban`
--

DROP TABLE IF EXISTS `xe_da_ban`;
CREATE TABLE IF NOT EXISTS `xe_da_ban` (
  `ID_xe_da_ban` varchar(10) NOT NULL,
  `ID_xe_ban` varchar(10) NOT NULL,
  `ID_khach_hang` varchar(10) NOT NULL,
  `gia_thoai_thuan` decimal(19,4) DEFAULT NULL,
  `ngay_ban` date DEFAULT NULL,
  `tien_tt_hang_thang` decimal(19,4) DEFAULT NULL,
  `ngay_tt_hang_thang` date DEFAULT NULL,
  `thong_tin_them` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_xe_da_ban`),
  KEY `ID_xe_ban` (`ID_xe_ban`),
  KEY `ID_khach_hang` (`ID_khach_hang`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `xe_da_ban`
--

INSERT INTO `xe_da_ban` (`ID_xe_da_ban`, `ID_xe_ban`, `ID_khach_hang`, `gia_thoai_thuan`, `ngay_ban`, `tien_tt_hang_thang`, `ngay_tt_hang_thang`, `thong_tin_them`) VALUES
('XDB025', 'XB025', 'KH020', '1100000000.0000', '2015-05-06', NULL, NULL, NULL),
('XDB024', 'XB024', 'KH020', '8600000000.0000', '2016-05-06', NULL, NULL, NULL),
('XDB023', 'XB023', 'KH019', '950000000.0000', '2021-04-05', NULL, NULL, NULL),
('XDB022', 'XB022', 'KH020', '1240000000.0000', '2014-04-05', NULL, NULL, NULL),
('XDB021', 'XB021', 'KH018', '1100000000.0000', '2015-06-07', NULL, NULL, NULL),
('XDB017', 'XB017', 'KH017', '1120000000.0000', '2021-05-06', NULL, NULL, NULL),
('XDB016', 'XB016', 'KH016', '1200000000.0000', '2010-02-04', NULL, NULL, NULL),
('XDB015', 'XB015', 'KH015', '950000000.0000', '2021-02-04', NULL, NULL, NULL),
('XDB014', 'XB014', 'KH014', '1200000000.0000', '2012-05-06', NULL, NULL, NULL),
('XDB013', 'XB013', 'KH013', '1100000000.0000', '2012-06-07', NULL, NULL, NULL),
('XDB012', 'XB012', 'KH012', '900000000.0000', '2017-06-07', NULL, NULL, NULL),
('XDB011', 'XB011', 'KH011', '1100000000.0000', '2021-05-06', NULL, NULL, NULL),
('XDB010', 'XB010', 'KH010', '8600000000.0000', '2021-02-04', NULL, NULL, NULL),
('XDB009', 'XB009', 'KH009', '950000000.0000', '2021-06-07', NULL, NULL, NULL),
('XDB008', 'XB008', 'KH008', '1240000000.0000', '2015-06-07', NULL, NULL, NULL),
('XDB007', 'XB007', 'KH007', '1120000000.0000', '2020-04-05', NULL, NULL, NULL),
('XDB006', 'XB006', 'KH006', '1200000000.0000', '2021-05-06', NULL, NULL, NULL),
('XDB005', 'XB005', 'KH005', '950000000.0000', '2020-04-05', NULL, NULL, NULL),
('XDB004', 'XB004', 'KH004', '1200000000.0000', '2021-04-05', NULL, NULL, NULL),
('XDB003', 'XB003', 'KH003', '1100000000.0000', '2019-01-02', NULL, NULL, NULL),
('XDB002', 'XB002', 'KH002', '900000000.0000', '2010-02-07', NULL, NULL, NULL),
('XDB001', 'XB001', 'KH001', '1000000000.0000', '2021-05-07', NULL, NULL, NULL),
('D11', '1sd', '1dd', '11.0000', '2021-01-01', '1.0000', '2021-01-01', ''),
('1', '1sd', '1ddd', '11.0000', '2021-01-01', '1.0000', '2021-01-01', ''),
('dd', 'd', 'd', '2.0000', '2021-01-01', '1.0000', '2021-01-01', '');

-- --------------------------------------------------------

--
-- Table structure for table `xe_mo_hinh`
--

DROP TABLE IF EXISTS `xe_mo_hinh`;
CREATE TABLE IF NOT EXISTS `xe_mo_hinh` (
  `ma_mo_hinh` varchar(10) NOT NULL,
  `ma_nxs` varchar(10) DEFAULT NULL,
  `ten_mo_hinh` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ma_mo_hinh`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `xe_mo_hinh`
--

INSERT INTO `xe_mo_hinh` (`ma_mo_hinh`, `ma_nxs`, `ten_mo_hinh`) VALUES
('MH001', '001', NULL),
('MH002', '002', NULL),
('MH003', '003', NULL),
('MH004', '004', NULL),
('MH005', '005', NULL),
('MH006', '006', NULL),
('MH007', '007', NULL),
('MH008', '008', NULL),
('MH009', '009', NULL),
('MH010', '010', NULL),
('MH011', '011', NULL),
('d', 'đđ', 'đđ');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
