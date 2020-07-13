import { useState, useEffect, useRef } from 'react'
import {debounce} from 'lodash';

type Fn = (...args: any) => any;

interface ReturnValue<T extends Fn> {
  run: T;
  cancel: () => void;
}

interface DebounceOptions {
  wait? : number;
  leading?: boolean;
  trailing?: boolean;
}


function depsAreSame (oldDeps: any[], deps: any[]): boolean {
  if(oldDeps === deps) return true;
  for (const i in oldDeps) {
    if (oldDeps[i] !== deps[i]) return false;
  }

  return true;
}

function useCreation<T>(factory: () => T, deps: any[]) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }

  return current.obj as T;
}

function useDebounceFn<T extends Fn>(fn: T, options?: DebounceOptions): ReturnValue<T> {
  const fnref = useRef<Fn>(fn);

  fnref.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () => 
    debounce(
      (...args: any) => {
        fnref.current(...args);
      },
      wait,
      options,
    ),
    [],
  )
  return {
    run: (debounced as any) as T,
    cancel: debounced.cancel,
  }
}


const useDebounec<T> = (value: T, options?: DebounceOptions) => {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);

  }, options)

  useEffect(() => {
    run();

  }, [value]);

  return debounced;

};

export default useDebounce;
