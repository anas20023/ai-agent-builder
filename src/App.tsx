import { AgentProvider } from './context/AgentContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Features
import Header from './features/agent-builder/Header'
import ConfigurationPanel from './features/agent-builder/ConfigurationPanel'
import PreviewPanel from './features/agent-builder/PreviewPanel'
import SavedAgentsList from './features/agent-builder/SavedAgentsList'

function App() {
  return (
    <AgentProvider>
      <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-100 transition-colors duration-500">
        <ToastContainer 
          position="top-right" 
          theme="light" 
          pauseOnFocusLoss={false} 
          autoClose={3000}
          toastClassName="rounded-2xl border border-slate-100 shadow-xl font-semibold text-sm"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <Header />

          <main className="flex flex-col gap-16 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <ConfigurationPanel />
              <PreviewPanel />
            </div>

            <SavedAgentsList />
          </main>
        </div>
      </div>
    </AgentProvider>
  )
}

export default App
