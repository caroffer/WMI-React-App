﻿/*
Deployment script for CarOfferCodeChallange

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "CarOfferCodeChallange"
:setvar DefaultFilePrefix "CarOfferCodeChallange"
:setvar DefaultDataPath "C:\Users\xeavi\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"
:setvar DefaultLogPath "C:\Users\xeavi\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
SET NOCOUNT ON;

SET IDENTITY_INSERT HondaWMI ON

MERGE INTO HondaWMI AS TARGET


USING (
	VALUES
	(987,'HONDA MOTOR CO., LTD','Passenger Car','JHM',NULL,'2015-01-01','2015-03-26','2015-06-04'),
	(988,'HONDA OF AMERICA MFG., INC.','Passenger Car','1HG','UNITED STATES (USA)','2015-01-01','2015-03-26',NULL),
	(989,'HONDA MFG., ALABAMA., LLC.','Passenger Car','5KB','UNITED STATES (USA)','2015-01-01','2015-03-26',NULL),
	(990,'HONDA OF CANADA MFG., INC.','Passenger Car','2HG','CANADA','2015-01-01','2015-03-26',NULL),
	(991,'HONDA OF THE U.K. MFG., LTD.','Passenger Car','SHH','UNITED KINGDOM (UK)','2015-01-01','2015-03-26',NULL),
	(992,'HONDA DE MEXICO','Passenger Car','3HG','MEXICO','2015-01-01','2015-03-26',NULL),
	(993,'HONDA MFG., INDIANA., LLC.','Passenger Car','19X',NULL,'2015-01-01','2015-03-26',NULL),
	(987,'HONDA MOTOR CO., LTD','Passenger Car','JH4',NULL,'2015-01-01','2015-03-27',NULL),
	(987,'HONDA MOTOR CO., LTD','Multipurpose Passenger Vehicle (MPV)','JHL',NULL,'2015-01-01','2015-03-27',NULL),
	(987,'HONDA MOTOR CO., LTD','Truck ','JH1',NULL,'2015-01-01','2015-03-27',NULL),
	(988,'HONDA OF AMERICA MFG., INC.','Passenger Car','19U','UNITED STATES (USA)','2015-01-01','2015-03-27','2015-03-27'),
	(988,'HONDA OF AMERICA MFG., INC.','Multipurpose Passenger Vehicle (MPV)','5J6','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(988,'HONDA OF AMERICA MFG., INC.','Multipurpose Passenger Vehicle (MPV)','5J8','UNITED STATES (USA)','2015-01-01','2015-03-27','2015-03-27'),
	(988,'HONDA OF AMERICA MFG., INC.','Truck ','5J7','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(988,'HONDA OF AMERICA MFG., INC.','Truck ','5J0','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(989,'HONDA MFG., ALABAMA., LLC.','Passenger Car','5KC','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(989,'HONDA MFG., ALABAMA., LLC.','Multipurpose Passenger Vehicle (MPV)','5FN','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(989,'HONDA MFG., ALABAMA., LLC.','Multipurpose Passenger Vehicle (MPV)','5FR','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(989,'HONDA MFG., ALABAMA., LLC.','Truck ','5FP','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(989,'HONDA MFG., ALABAMA., LLC.','Truck ','5FS','UNITED STATES (USA)','2015-01-01','2015-03-27',NULL),
	(990,'HONDA OF CANADA MFG., INC.','Passenger Car','2HH','CANADA','2015-01-01','2015-03-27','2015-03-27'),
	(990,'HONDA OF CANADA MFG., INC.','Multipurpose Passenger Vehicle (MPV)','2HK','CANADA','2015-01-01','2015-03-27',NULL),
	(990,'HONDA OF CANADA MFG., INC.','Multipurpose Passenger Vehicle (MPV)','2HN','CANADA','2015-01-01','2015-03-27',NULL),
	(990,'HONDA OF CANADA MFG., INC.','Truck ','2HJ','CANADA','2015-01-01','2015-03-27',NULL),
	(990,'HONDA OF CANADA MFG., INC.','Truck ','2HU','CANADA','2015-01-01','2015-03-27',NULL),
	(991,'HONDA OF THE U.K. MFG., LTD.','Multipurpose Passenger Vehicle (MPV)','SHS','UNITED KINGDOM (UK)','2015-01-01','2015-03-27',NULL),
	(992,'HONDA DE MEXICO','Multipurpose Passenger Vehicle (MPV)','3CZ','MEXICO','2015-01-01','2015-03-27',NULL),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','JH2',NULL,'2015-01-01','2015-04-03','2015-06-04'),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','1HF',NULL,'2015-01-01','2015-04-03','2015-06-04'),
	(988,'HONDA OF AMERICA MFG., INC.','Motorcycle','YC1','BELGIUM','2015-01-01','2015-04-03','2016-07-08'),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','3H1',NULL,'2015-01-01','2015-04-03','2015-06-04'),
	(993,'HONDA MFG., INDIANA., LLC.','Passenger Car','19V','UNITED STATES (USA)','2015-01-01','2015-04-21',NULL),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','ZDC',NULL,'2015-01-01','2015-06-04','2016-06-17'),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','MLH',NULL,'2015-01-01','2015-06-04',NULL),
	(14790,'SUNDIRO HONDA MOTORCYCLE CO., LTD.','Motorcycle','LAL','CHINA','2015-01-01','2015-06-04','2017-08-01'),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','RLH',NULL,'2015-01-01','2015-06-04',NULL),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','VTM',NULL,'2015-01-01','2015-06-04',NULL),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','LWB',NULL,'2015-01-01','2015-06-04',NULL),
	(12142,'CHONGQING GUANGYU MOTORCYCLE MANUFACTURE CO., LTD.','Motorcycle','LRY','CHINA','2015-01-01','2015-07-07','2019-11-06'),
	(11163,'CHONGQING HI-BIRD MOTORCYCLE INDUSTRY CO., LTD.','Motorcycle','LSR','CHINA','2015-01-01','2015-07-07',NULL),
	(12294,'CHONGQING KAIER MOTORCYCLE MANUFACTURING CO.,','Motorcycle','LYE','CHINA','2015-01-01','2015-07-07',NULL),
	(10479,'CHONGQING KINLON MOTORCYCLE MANUFACTURE CO., LTD','Motorcycle','LLC','CHINA','2015-01-01','2015-07-07','2015-07-22'),
	(11366,'CHONGQING HUANSONG INDUSTRIES (GROUP) CO., LTD.','Motorcycle','LWG','CHINA','2015-01-01','2015-07-07',NULL),
	(1471,'CHONGQING RATO POWER CO., LTD.','Motorcycle','LRP','CHINA','2015-01-01','2015-07-07',NULL),
	(6877,'CHONGQING YINXIANG MOTORCYCLE (GROUP) CO., LTD.','Motorcycle','LB4','CHINA','2015-01-01','2015-07-07','2015-09-15'),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Multipurpose Passenger Vehicle (MPV)','JR2','UNITED STATES (USA)','2015-01-01','2015-07-15',NULL),
	(10754,'WUXI JINHONG MOTORCYCLE CO., LTD','Motorcycle','LC3','CHINA','2015-01-01','2015-07-16','2017-08-22'),
	(6460,'JOYHON, INC.','Trailer','1J9390','UNITED STATES (USA)','2015-01-01','2015-07-20',NULL),
	(6108,'CHANGZHOU ZHONGMAO MACHINERY CO., LTD','Trailer','L0H','CHINA','2015-01-01','2015-07-20',NULL),
	(12293,'CHONGQING ASTRONAUTIC BASHAN MOTORCYCLE MANUFACTURING CO., LTD.','Motorcycle','LHJ','CHINA','2015-01-01','2015-07-21',NULL),
	(11400,'MARATHON METALWORKS','Trailer','1M9822','UNITED STATES (USA)','2015-01-01','2015-07-23',NULL),
	(11152,'CHONGQING HENSIM GROUP CO., LTD.','Motorcycle','LUA','CHINA','2015-07-27','2015-07-27',NULL),
	(13493,'JIANGMEN SINO-HONGKONG BAOTIAN MOTORCYCLE INDUSTRIAL CO., LTD.','Motorcycle','L82','CHINA','2015-08-05','2015-08-05',NULL),
	(7575,'SHANDONG ZHONGTONG FEIYAN AUTOMOBILE CO. LTD.','Motorcycle','L69FYK','UNITED STATES (USA)','2015-08-07','2015-08-07',NULL),
	(9274,'TAIZHOU ZHONGNENG MOTORCYCLE CO., LTD.','Motorcycle','L5Y','CHINA','2015-08-10','2015-08-10',NULL),
	(1327,'SHANGHAI HUIZHONG AUTOMOTIVE MANUFACTURING CO., LTD','Trailer','LSB','CHINA','2015-08-11','2015-08-11',NULL),
	(8915,'SHANGHAI HONLING MOTORCYCLE MANUFACTURE CO., LTD.','Motorcycle','LLA','CHINA','2015-08-11','2015-08-11',NULL),
	(18814,'CHONGQING ANDES MOTORCYCLE MANUFACTURING CO.,LTD.','Motorcycle','LKX','CHINA','2015-08-31','2015-08-31','2020-05-01'),
	(10038,'CHONGQING SHUANGQING MECHANICAL & ELECTRICAL CO.','Motorcycle','LZX','CHINA','2015-09-03','2015-09-03','2016-06-24'),
	(9554,'CHONGQUING DAJIANG MOTORCYCLES CO., LTD','Motorcycle','L1P','CHINA','2015-09-04','2015-09-04','2019-11-07'),
	(1695,'MARATHON HOMES CORPORATION','Trailer','1M9019','UNITED STATES (USA)','2015-09-16','2015-09-16',NULL),
	(7363,'Xinri E-Vehicle Hongkong Co., Limited','Motorcycle','R12','CHINA','2015-11-06','2015-11-06',NULL),
	(14236,'CHONGQING SHINERAY MOTORCYCLE CO., LTD.','Motorcycle','LXY','CHINA','2015-12-17','2015-12-17','2018-08-06'),
	(1154,'AMERICAN HONDA MOTOR CO., INC.','Motorcycle','9C2',NULL,'1988-12-30','2015-12-30',NULL),
	(987,'HONDA MOTOR CO., LTD','Motorcycle','JH3','JAPAN','2016-06-08','2016-06-08',NULL),
	(993,'HONDA MFG., INDIANA., LLC.','Motorcycle','478','UNITED STATES (USA)','2016-06-08','2016-06-08',NULL),
	(15171,'MONTESA HONDA SA','Motorcycle','VTD','SPAIN','2016-06-17','2016-06-17',NULL),
	(15538,'CHONGQING YINGANG SCIENCE & TECHNOLOGY (GROUP) CO., LTD.','Motorcycle','LY4','CHINA','2016-08-31','2016-08-31','2016-09-01'),
	(15739,'RONGCHENG COMPAKS (HONG KONG) NEW ENERGY AUTOMOBILE CO LTD','Trailer','R1V','HONG KONG','2016-10-26','2016-10-26',NULL),
	(15238,'MARATHON EQUIPMENT LTD ','Trailer','2M9004','CANADA','2017-02-22','2017-02-22','2017-04-11'),
	(993,'HONDA MFG., INDIANA., LLC.','Multipurpose Passenger Vehicle (MPV)','7FA','UNITED STATES (USA)','2017-03-09','2017-03-09',NULL),
	(8769,'GRYPHON BIKES & CHOPPERS','Motorcycle','1G9340','UNITED STATES (USA)','2017-05-08','2017-05-08',NULL),
	(9042,'JIANGMEN ZHONGYU MOTOR (GROUP) CO., LTD.','Motorcycle','LMF','CHINA','2017-05-17','2017-05-17',NULL),
	(16100,'JHC NEW ENERGY VEHICLE HONGKONG CO.,LTD','Low Speed Vehicle (LSV)','R1A','CHINA','2017-05-23','2017-05-23',NULL),
	(16653,'NANCHANG AIRCRAFT MFG. CO ( HONGDU MACHINERY PLANT)','Motorcycle','LPP','CHINA','2017-06-27','2017-06-27',NULL),
	(1879,'HONNOR MARINE LTD','Trailer','SA9112','UNITED KINGDOM (UK)','2017-11-03','2017-11-03',NULL),
	(17562,'HONGDU ELECTRIC VEHICLE HONGKONG CO.,LIMITED','Motorcycle','R2L','CHINA','2018-01-17','2018-01-17',NULL),
	(9877,'HONGDOU GROUP CHITUMA MOTORCYCLE COMPANY','Motorcycle','LE6','CHINA','2018-01-25','2018-01-25',NULL),
	(3847,'MARATHON EQUIPMENT COMPANY (DEL)','Trailer','1M9371','UNITED STATES (USA)','2018-03-14','2018-03-14',NULL),
	(17686,'CHONGQING HUANGHE MOTORCYCLE CO.,LTD. ','Motorcycle','LDU','CHINA','2018-05-11','2018-05-11',NULL),
	(18570,'CHONGQING LIYANG JIAYU MOTORCYCLE CO., LTD.','Motorcycle','LC4','CHINA','2018-08-10','2018-08-10',NULL),
	(20032,'ELYX SMART TECHNOLOGY HOLDINGS (HONGKONG) LIMITED','Motorcycle','R4N','CHINA','2020-08-31','2020-08-31',NULL)
) AS SOURCE(
	[Id],
	[Name],
	[VehicleType],
	[WMI],
	[Country],
	[DateAvailableToPublic], 
	[CreatedOn],
	[UpdatedOn]
)
ON TARGET.Id = SOURCE.Id
WHEN MATCHED
THEN UPDATE SET
	TARGET.[Name] = SOURCE.[Name],
	TARGET.[VehicleType] = SOURCE.[VehicleType],
	TARGET.[WMI] = SOURCE.[WMI],
	TARGET.[Country] = SOURCE.[Country],
	TARGET.[DateAvailableToPublic] = SOURCE.[DateAvailableToPublic], 
	TARGET.[CreatedOn] = SOURCE.[CreatedOn],
	TARGET.[UpdatedOn] = SOURCE.[UpdatedOn]
WHEN NOT MATCHED BY TARGET
THEN INSERT(
	[Id],
	[Name],
	[VehicleType],
	[WMI],
	[Country],
	[DateAvailableToPublic], 
	[CreatedOn],
	[UpdatedOn]
)
VALUES(
	SOURCE.[Id],
	SOURCE.[Name],
	SOURCE.[VehicleType],
	SOURCE.[WMI],
	SOURCE.[Country],
	SOURCE.[DateAvailableToPublic], 
	SOURCE.[CreatedOn],
	SOURCE.[UpdatedOn]
);

SET IDENTITY_INSERT HondaWMI OFF;

SET NOCOUNT OFF;
GO

GO
PRINT N'Update complete.';


GO
