using KokoType.LessonService.DAL.Context;
using KokoType.LessonService.DAL.Interfaces;
using KokoType.LessonService.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

public class UnitOfWork_Lesson : IUnitOfWork
{
    private readonly IDbContextFactory<LessonContext> _contextFactory;
    private LessonRepository _lessonRepository;
    private LessonPageRepository _lessonPageRepository;
    private LessonResultRepository _lessonResultRepository;

    public UnitOfWork_Lesson(IDbContextFactory<LessonContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public LessonRepository LessonRepository
    {
        get
        {
            if (_lessonRepository == null)
                _lessonRepository = new LessonRepository(_contextFactory);
            return _lessonRepository;
        }
    }

    public LessonPageRepository LessonPageRepository
    {
        get
        {
            if (_lessonPageRepository == null)
                _lessonPageRepository = new LessonPageRepository(_contextFactory);
            return _lessonPageRepository;
        }
    }

    public LessonResultRepository LessonResultRepository
    {
        get
        {
            if (_lessonResultRepository == null)
                _lessonResultRepository = new LessonResultRepository(_contextFactory);
            return _lessonResultRepository;
        }
    }
}