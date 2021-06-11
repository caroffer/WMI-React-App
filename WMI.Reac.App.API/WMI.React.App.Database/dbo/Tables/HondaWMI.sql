CREATE TABLE [dbo].[HondaWMI] (
    [Id]                    INT            NOT NULL,
    [Name]                  NVARCHAR (255) NOT NULL,
    [VehicleType]           NVARCHAR (50)  NOT NULL,
    [WMI]                   NVARCHAR (16)  NOT NULL,
    [Country]               NVARCHAR (50)  NULL,
    [DateAvailableToPublic] DATE           NOT NULL,
    [CreatedOn]             DATETIME       NOT NULL,
    [UpdatedOn]             DATETIME       NULL,
    CONSTRAINT [PK_HondaWMI] PRIMARY KEY CLUSTERED ([WMI])
);

