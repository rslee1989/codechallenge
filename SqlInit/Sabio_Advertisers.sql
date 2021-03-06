USE [Sabio02]
GO
/****** Object:  Table [dbo].[Sabio_Advertisers]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sabio_Advertisers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[shortTitle] [nvarchar](255) NULL,
	[title] [nvarchar](100) NULL,
	[shortDescription] [nvarchar](400) NULL,
	[content] [nvarchar](255) NULL,
	[slug] [nvarchar](50) NULL,
	[entityTypeId] [int] NULL,
	[statusId] [int] NULL,
	[dateCreated] [datetime2](7) NOT NULL,
	[dateModified] [datetime2](7) NOT NULL,
	[baseMetaData] [int] NULL,
 CONSTRAINT [PK_dbo.Sabio_Advertisers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sabio_Location]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sabio_Location](
	[Id] [int] NOT NULL,
	[latitude] [int] NULL,
	[longitude] [int] NULL,
	[zipcode] [nvarchar](50) NULL,
	[address] [nvarchar](255) NULL,
 CONSTRAINT [PK_dbo.Sabio_Location] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sabio_MetaData]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sabio_MetaData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[dateStart] [datetime2](7) NOT NULL,
	[dateEnd] [datetime2](7) NOT NULL,
	[location] [int] NULL,
 CONSTRAINT [PK_dbo.Sabio_MetaData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Sabio_Advertisers] ADD  CONSTRAINT [DF_Sabio_Advertisers_dateCreated]  DEFAULT (getutcdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[Sabio_Advertisers] ADD  CONSTRAINT [DF_Sabio_Advertisers_dateModified]  DEFAULT (getutcdate()) FOR [dateModified]
GO
ALTER TABLE [dbo].[Sabio_MetaData] ADD  CONSTRAINT [DF_dbo.Sabio_MetaData_dateStart]  DEFAULT (getutcdate()) FOR [dateStart]
GO
ALTER TABLE [dbo].[Sabio_MetaData] ADD  CONSTRAINT [DF_dbo.Sabio_MetaData_dateEnd]  DEFAULT (getutcdate()) FOR [dateEnd]
GO
/****** Object:  StoredProcedure [dbo].[Sabio_Advertisers_Delete_ById]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Sabio_Advertisers_Delete_ById]
		@Id int

/*

	Declare @Id int = 3

	Select *
	From dbo.Sabio_Advertisers
	Where Id = @Id;

	Execute dbo.Sabio_Advertisers_Delete_ById 
				@Id

	Select *
	From dbo.Sabio_Advertisers
	Where Id = @Id;

*/

AS


BEGIN

	DELETE FROM dbo.Sabio_Advertisers
	WHERE Id = @Id;

END
GO
/****** Object:  StoredProcedure [dbo].[Sabio_Advertisers_Insert]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[Sabio_Advertisers_Insert]
			
			@shortTitle nvarchar(255),
			@title nvarchar(100),
			@shortdescription nvarchar(400),
			@content nvarchar(255),
			@slug nvarchar(50),
			@entityTypeId int,
			@statusId int,
			@baseMetaData int,
			@Id int Output

/*   ----TEST CODE----


Declare @Id int = 0;

Declare 

			@shortTitle nvarchar(255) = 'a short title',
			@title nvarchar(100) = 'random title',
			@shortdescription nvarchar(400) = 'a short description',
			@content nvarchar(255) = 'some content',
			@slug nvarchar(50) = 'www.sdasdas.com',
			@entityTypeId int = 1,
			@statusId int = 1,
			@baseMetaData int = 1

	

Execute [dbo].[Sabio_Advertisers_Insert]

		@shortTitle,
			@title,
			@shortdescription,
			@content,
			@slug,
			@entityTypeId,
			@statusId,
			@baseMetaData,
			@Id Output

		Select @Id

		Select *
		from dbo.Sabio_Advertisers
		Where Id=@Id

*/

AS


BEGIN

	INSERT INTO [dbo].[Sabio_Advertisers]
           ([shortTitle],
		    [title],
			[shortDescription],
			[content],
			[slug],
			[entityTypeId],
			[statusId],
			[baseMetaData])
	VALUES
			(
			@shortTitle,
			@title,
			@shortdescription,
			@content,
			@slug,
			@entityTypeId,
			@statusId,
			@baseMetaData
		   )

	SET @Id = SCOPE_IDENTITY()

END
GO
/****** Object:  StoredProcedure [dbo].[Sabio_Advertisers_SelectAll]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Sabio_Advertisers_SelectAll]
			 @pageIndex int
			,@pageSize int

/*

	DECLARE @pageIndex int = 0
			,@pageSize int = 10

	EXECUTE dbo.Sabio_Advertisers_SelectAll
			@pageIndex
			,@pageSize

*/

AS


BEGIN

	DECLARE @offset int = @pageIndex * @pageSize

	SELECT  [Id],
			[shortTitle],
		    [title],
			[shortDescription],
			[content],
			[slug],
			[entityTypeId],
			[statusId],
			[dateCreated],
			[dateModified],
			[baseMetaData],
			[TotalCount] = COUNT(1) OVER()

	FROM  [dbo].[Sabio_Advertisers]
	
	ORDER BY DateCreated DESC

	OFFSET @offSet ROWS
	FETCH NEXT @pageSize ROWS ONLY

END
GO
/****** Object:  StoredProcedure [dbo].[Sabio_Advertisers_SelectById]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Sabio_Advertisers_SelectById]
			@Id int
/*

	declare @Id int = 5;
	Execute [dbo].[Sabio_Advertisers_SelectById] 
				@Id

*/

as
BEGIN

	SELECT 
	      [Id]
		    [shortTitle],
		    [title],
			[shortDescription],
			[content],
			[slug],
			[entityTypeId],
			[statusId],
			[dateCreated],
			[dateModified],
			[baseMetaData]
	  FROM [dbo].[Sabio_Advertisers]
	  Where Id = @Id

END



GO
/****** Object:  StoredProcedure [dbo].[Sabio_Advertisers_Update]    Script Date: 8/9/2019 1:02:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Sabio_Advertisers_Update]
			@shortTitle nvarchar(255),
			@title nvarchar(100),
			@shortdescription nvarchar(400),
			@content nvarchar(255),
			@slug nvarchar(50),
			@entityTypeId int,
			@statusId int,
			@baseMetaData int,
			@Id int

/*

	DECLARE @Id int = 2;

	DECLARE @shortTitle nvarchar(255) = 'stitl32123123e',
			@title nvarchar(100) = 'title',
			@shortdescription nvarchar(400) = 'sdescription',
			@content nvarchar(255) = 'content',
			@slug nvarchar(50) = 'slug',
			@entityTypeId int = 1,
			@statusId int = 1,
			@baseMetaData int = 1

		SELECT *
		FROM dbo.Sabio_Advertisers
		WHERE Id = @Id

	EXECUTE dbo.Sabio_Advertisers_Update
			@shortTitle,
			@title,
			@shortdescription,
			@content,
			@slug,
			@entityTypeId,
			@statusId,
			@baseMetaData,
			@Id

		SELECT *
		FROM dbo.Sabio_Advertisers
		WHERE Id = @Id

*/

AS


BEGIN

	DECLARE @dateNow datetime2 = getutcdate();
	
	UPDATE dbo.Sabio_Advertisers
		
		SET  
			[shortTitle] = @shortTitle,
		    [title] = @title,
			[shortDescription] = @shortDescription,
			[content] = @content,
			[slug] = @slug,
			[entityTypeId] = @entityTypeId,
			[statusId] = @statusId,
			[baseMetaData] = @baseMetaData,
			[dateModified] = @dateNow

	WHERE [Id] = @Id

End
GO
