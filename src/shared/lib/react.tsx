"use client"

import {
    Context,
    createContext,
    useContext,
    startTransition,
    useEffect,
    useState,
    ReactNode,
    Children,
    isValidElement,
    createElement,
    useMemo,
    useRef,
  } from "react";
  
  export function useStrictContext<T>(context: Context<T | null>) {
    const value = useContext(context);
    if (value === null) throw new Error("Strict context not passed");
    return value as T;
  }
  
  export function createStrictContext<T>() {
    return createContext<T | null>(null);
  }
  
  export function useAppearanceDelay(
    show?: boolean,
    options = {} as {
      defaultValue?: boolean;
      appearenceDelay?: number;
      minDisplay?: number;
    },
  ) {
    const {
      minDisplay = 500,
      defaultValue = false,
      appearenceDelay = 500,
    } = options;
  
    const [delayedShow, setDelayedShow] = useState(defaultValue);
  
    useEffect(() => {
      if (show) {
        const timer = setTimeout(() => {
          startTransition(() => setDelayedShow(true));
        }, appearenceDelay);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          startTransition(() => setDelayedShow(false));
        }, minDisplay);
        return () => clearTimeout(timer);
      }
    }, [appearenceDelay, show, minDisplay]);
  
    return delayedShow;
  }
  
  export function ComposeChildren({ children }: { children: ReactNode }) {
    const array = Children.toArray(children);
    const last = array.pop();
    return (
      <>
        {array.reduceRight(
          (child, element) =>
            isValidElement(element)
              ? createElement(element.type, element.props, child)
              : child,
          last,
        )}
      </>
    );
  }
  
  type Fn<ARGS extends any[], R> = (...args: ARGS) => R;
  
  export function useEventCallback<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
    const ref = useRef<Fn<A, R>>(fn);
    useEffect(() => {
      ref.current = fn;
    });
    return useMemo(
      () =>
        (...args: A): R => {
          const { current } = ref;
          return current(...args);
        },
      [],
    );
  }

  export const useIsMobile = () => {
    // Инициализируем состояние с использованием useState
    const [isMobile, setIsMobile] = useState(() => {
      // Проверяем, доступен ли объект window
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768;
      }
      return false; // или любое другое значение по умолчанию
    });
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      // Добавляем обработчик события только если window доступен
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize);
      }
  
      // Очистка события при размонтировании компонента 
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
        }
      };
    }, []);
  
    return isMobile;
  };