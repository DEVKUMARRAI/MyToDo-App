using Server.Models.Entities;
using Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly MyTodoAppDbContext _context;
    public TodosController(MyTodoAppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        return await _context.Todos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo != null)
        {
            return todo;
        }
        return NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
    {
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(int id, Todo todo)
    {
        if (id != todo.Id)
        {
            return BadRequest();
        }

        var toUpdate = await _context.Todos.FindAsync(id);

        if (toUpdate == null)
        {
            return NotFound();
        }

        toUpdate.Title = todo.Title;
        toUpdate.IsCompleted = todo.IsCompleted;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var toDelete = await _context.Todos.FindAsync(id);

        if(toDelete == null)
        {
            return NotFound();
        }
        _context.Todos.Remove(toDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}