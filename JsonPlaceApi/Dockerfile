#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["JsonPlaceApi/JsonPlaceApi.csproj", "JsonPlaceApi/"]
COPY ["JsonPlace.DataTransferObjects/JsonPlace.DataTransferObjects.csproj", "JsonPlace.DataTransferObjects/"]
COPY ["JsonPlace.Business/JsonPlace.Business.csproj", "JsonPlace.Business/"]
COPY ["JsonPlace.Repository/JsonPlace.Repository.csproj", "JsonPlace.Repository/"]
COPY ["JsonPlace.Core/JsonPlace.Core.csproj", "JsonPlace.Core/"]
COPY ["JsonPlace.Common/JsonPlace.Common.csproj", "JsonPlace.Common/"]
RUN dotnet restore "JsonPlaceApi/JsonPlaceApi.csproj"
COPY . .
WORKDIR "/src/JsonPlaceApi"
RUN dotnet build "JsonPlaceApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JsonPlaceApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JsonPlaceApi.dll"]