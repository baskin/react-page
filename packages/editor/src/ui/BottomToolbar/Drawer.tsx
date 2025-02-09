import React, { Fragment } from 'react';
import { Divider, Segment, TransitionablePortal } from 'semantic-ui-react';

// const darkBlack = 'rgba(0, 0, 0, 0.87)';
// const bright = 'rgba(255,255,255, 0.98)';
// const brightBorder = 'rgba(0, 0, 0, 0.12)';

type BottomToolbarDrawerProps = {
  open: boolean;
  style?: React.CSSProperties;
  className?: string;
  anchor?: string;
  dark?: boolean;
  scale?: number;
};

export const BottomToolbarDrawer: React.FC<BottomToolbarDrawerProps> = ({
  className,
  anchor,
  open,
  dark,
  scale = 1,
  children,
  style = {},
}) => {
  const theChildren = React.Children.toArray(children).filter(Boolean);
//   const isSmall = useIsSmallScreen();

  return (
    <TransitionablePortal transition={{ duration: 300 }} 
        open={open} closeOnDocumentClick={false} closeOnEscape={false}>
        <Segment secondary raised style={{ ...style,
            left: 0, right: 0, margin: 'auto', position: 'fixed', 
            // TODO make this work for mobile screen
            minWidth: '50vw', maxWidth: 'min(1280px, calc(100vw - 300px))',
            bottom: '0%', zIndex: 1000
        }}>
        {theChildren.map((child, index) => (
            <Fragment key={index}>
               {child}
               {/* skip first 2 children that are left & right labels */}
               {index < theChildren.length - 1 && index > 1 ? <Divider /> : null}
            </Fragment>
        ))}
        </Segment>
    </TransitionablePortal>
  )
//   return (
//     <Portal>
//       <Drawer
//         SlideProps={{
//           mountOnEnter: true,
//           unmountOnExit: true,
//         }}
//         variant="persistent"
//         className={className}
//         open={open}
//         anchor={anchor}
//         PaperProps={{
//           style: {
//             zIndex: 10,
//             backgroundColor: 'transparent',
//             border: 'none',
//             overflow: 'visible',
//             pointerEvents: 'none',
//           },
//         }}
//       >
//         <div
//           style={{
//             pointerEvents: 'all',
//             border: `${dark ? darkBlack : brightBorder} 1px solid`,
//             borderRadius: '4px 4px 0 0',
//             backgroundColor: dark ? darkBlack : bright,
//             padding: '12px 24px',

//             ...(isSmall
//               ? {
//                   marginLeft: 20,
//                   marginRight: 80,
//                 }
//               : {
//                   marginLeft: 'auto',
//                   marginRight: 'auto',
//                   minWidth: '50vw',
//                   maxWidth: 'min(1280px, calc(100vw - 250px))',
//                 }),
//             boxShadow: '0px 1px 8px -1px rgba(0,0,0,0.4)',
//             position: 'relative',

//             transformOrigin: 'bottom',
//             transform: `scale(${scale})`,
//             transition: 'scale 0.3s',
//             ...style,
//           }}
//         >
//           {theChildren.map((child, index) => (
//             <Fragment key={index}>
//               {child}
//               {index < theChildren.length - 1 ? divider : null}
//             </Fragment>
//           ))}
//         </div>
//       </Drawer>
//     </Portal>
//   );
};
