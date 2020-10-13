let wontBind = [
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
];


let toBind = [];



function autoBind(context) {
  if(context === undefined) {
    console.error('autobind error: no Context provided');
    return;
  }
  // boolean
  const options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
  let objProtoType = Object.getPrototypeOf(context);
  // 메서드는 지정된 컨텍스트 내부의 프로토 타입을 반환
  
  if (options.bindOnly) {
    toBind = options.bindOnly;
  } else {
    toBind = Object.getOwnPropertyNames(objProtoType);

    wontBind = wontBind.concat(options.wontBind || []);
  }

  toBind.forEach(function(method) {
    let descriptor = Object.getOwnPropertyDescriptor(objProtoType, method);
    console.log(descriptor)
    if (descriptor === undefined) {
      console.warn(`Autobind: "${method}" method not found in class`);
      return;
    }
    console.log(objProtoType)
    if(wontBind.indexOf(method) !== -1 || typeof descriptor.value !== 'function') {
      return;
    }

    Object.defineProperty(objProtoType, method, boundMethod(objProtoType, method, descriptor));
  });
};

function boundMethod(objProtoType, method, descriptor) {
  let fn = descriptor.value;

  return {
    configurable: true,
    get() {
      if(this === objProtoType || this.hasOwnProperty(method)) {
        return fn;
      }
      let boundFn = fn.bind(this);
      Object.defineProperty(this, method, {
        value: boundFn,
        configurable: true,
        writable: true,
      });
      return boundFn;
    }
  }

}

console.log(autoBind(global))