import { useContext } from 'react';

export function useSafeContext<Context>(context: React.Context<Context>) {
  const contextData = useContext(context);

  if (contextData === null) {
    throw new Error('You are trying to use a context outside of the provider!');
  }

  return contextData;
}
