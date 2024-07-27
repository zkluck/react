// import React, { FC } from 'react';

// interface AaaProps {
//   children: React.ReactNode;
// }

// const Aaa: FC<AaaProps> = (props) => {
//   const { children } = props;

//   const count = React.Children.count(children);

//   console.log('count', count);

//   const arr = React.Children.toArray(children);

//   console.log(arr.sort());

//   const first = React.Children.only(children);
//   console.log('first', first);

//   return (
//     <div className="container">
//       {React.Children.map(children, (item) => {
//         return <div className="item">{item}</div>;
//       })}
//     </div>
//   );
// };

// function App() {
//   return (
//     <Aaa>
//       <a href="#">111</a>
//       <a href="#">222</a>
//       <a href="#">333</a>
//     </Aaa>
//   );
// }

// export default App;

import React from 'react';
import img1 from './img1.png';
import img2 from './img2.png';
import LazyLoad from './MyLazyLoad';

const LazyGuang = React.lazy(() => import('./Guang') as any);

export default function App() {
  return (
    <div>
      {/* <LazyGuang/> */}
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      {/* <LazyLoad
        placeholder={<div>loading...</div>}
        onContentVisible={() => {
          console.log('comp visible');
        }}
      >
       
        <LazyGuang />
      </LazyLoad> */}
      <LazyLoad
        placeholder={<div>loading...</div>}
        onContentVisible={() => {
          console.log('img visible');
        }}
      >
        <img src={img2} />
      </LazyLoad>
    </div>
  );
}
