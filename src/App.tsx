import React from 'react';
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import HomeScreen from './screens/HomeScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}

export default App;
