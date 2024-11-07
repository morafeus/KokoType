﻿// <auto-generated />
using System;
using KokoType_DAL_Lesson.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace KokoType_DAL_Lesson.Migrations
{
    [DbContext(typeof(LessonContext))]
    [Migration("20241106203131_addDb")]
    partial class addDb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("KokoType_DAL_Lesson.Models.Lesson", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("KokoType_DAL_Lesson.Models.LessonPage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("lessonId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("lessonId");

                    b.ToTable("LessonPages");
                });

            modelBuilder.Entity("KokoType_DAL_Lesson.Models.LessonResult", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("LessonId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("LessonId");

                    b.ToTable("LessonResults");
                });

            modelBuilder.Entity("KokoType_DAL_Lesson.Models.LessonPage", b =>
                {
                    b.HasOne("KokoType_DAL_Lesson.Models.Lesson", "lesson")
                        .WithMany()
                        .HasForeignKey("lessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("lesson");
                });

            modelBuilder.Entity("KokoType_DAL_Lesson.Models.LessonResult", b =>
                {
                    b.HasOne("KokoType_DAL_Lesson.Models.Lesson", "Lesson")
                        .WithMany()
                        .HasForeignKey("LessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lesson");
                });
#pragma warning restore 612, 618
        }
    }
}