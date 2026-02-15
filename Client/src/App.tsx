import { TodoList } from './components/todos/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-12 px-4">
        <header className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            MyToDo App
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Stay organized and productive with your personal task manager
          </p>
        </header>

        <main>
          <TodoList />
        </main>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          Built with React, TypeScript & ASP.NET Core
        </footer>
      </div>
    </div>
  );
}

export default App;
