import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Hammer from 'hammerjs';

interface DrawerInterface {
  open: boolean;
  plusActive: boolean;
  holdingDrawerPosition: any;
  maxWidth: number;
  animation: string;
  topBarHeight: number;
  direction: string;
  endTrue: boolean;
  speed: number;
  useActionButton: boolean;
}

// the code for slideable navbar is copied and refactored from https://codepen.io/vincurekf/pen/bdmVpM

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() enabled: boolean;

  show: () => void;
  hide: () => void;

  elementClicked = () => {
    this.hide();
  }

  constructor() { }

  ngOnInit() {
    let swipe: HTMLElement | SVGElement;
    let swipeH;
    let body;
    let bodyH;
    let drawer;
    let drawerH;
    let deviceW;
    let deviceH;
    let drawerDimm;
    let drawerDimmH;

    const nDrawer: DrawerInterface = {
      open: false,
      plusActive: false,
      holdingDrawerPosition: null,
      direction: '',
      endTrue: true,
      maxWidth: 256,
      speed: 0.2,
      animation: 'ease-out',
      topBarHeight: 56,
      useActionButton: true
      // options: {
      //   maxWidth: 300,
      //   topBarHeight: 0,
      //   speed: 0.2,
      //   animation: 'ease-out',
      //   useActionButton: false
      // }
    };
    const show = () => {
      drawer.style.transition =
        'all ' + nDrawer.speed + 's ' + nDrawer.animation;
      drawer.style.webkitTransform = 'translate(0,0)' + 'translateZ(0)';
      drawer.style.msTransform = drawer.style.MozTransform = drawer.style.OTransform =
        'translateX(0)';
      drawer.style.boxShadow = '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.20)';

      drawerDimm.style.transition =
        'all ' + nDrawer.speed + 's ' + nDrawer.animation;
      drawerDimm.style.visibility = 'visible';
      drawerDimm.style.opacity = '1';
      nDrawer.open = true;
    };

    this.show = show;

    const hide = () => {
      drawer.style.transition =
        'all ' + nDrawer.speed + 's ' + nDrawer.animation;
      drawer.style.webkitTransform =
        'translate(-' + nDrawer.maxWidth + 'px,0)' + 'translateZ(0)';
      drawer.style.msTransform = drawer.style.MozTransform = drawer.style.OTransform =
        'translateX(-' + nDrawer.maxWidth + 'px)';
      drawer.style.boxShadow = 'none';

      drawerDimm.style.transition =
        'all ' + nDrawer.speed + 's ' + nDrawer.animation;
      drawerDimm.style.visibility = 'hidden';
      drawerDimm.style.opacity = '0';
      nDrawer.open = false;
    };

    this.hide = hide;

    const move = (ev, holdingDrawer?) => {
      // check for direction
      nDrawer.direction = ev.type === 'panleft' ? 'left' : 'right';
      // figure out position, depending on wheter we are holding drawer itself somwhere in the middle
      // or just the edge
      let pos = ev.center.x - nDrawer.maxWidth;
      if (holdingDrawer) {
        nDrawer.holdingDrawerPosition = nDrawer.holdingDrawerPosition
          ? nDrawer.holdingDrawerPosition
          : pos;
        pos = pos + Math.abs(nDrawer.holdingDrawerPosition);
      }
      pos = pos < 0 ? pos : 0;
      // calculate opacity of background dimmer based on touch position (within max width range 0-100%)
      const opacityModder = nDrawer.maxWidth - Math.abs(pos);
      let opacity = opacityModder / (nDrawer.maxWidth / 100) / 100;
      opacity = opacity < 1 ? opacity : 1;
      // apply styles when moving
      drawerDimm.style.visibility = 'visible';
      drawerDimm.style.opacity = opacity.toFixed(2);

      drawer.style.transition = 'none';
      drawer.style.webkitTransform =
        'translate(' + pos + 'px,0)' + 'translateZ(0)';
      drawer.style.msTransform = drawer.style.MozTransform = drawer.style.OTransform =
        'translateX(' + pos + 'px)';
      drawer.style.boxShadow = '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.20)';
      // if this is final touch (mouse move) event
      // show or hide the drawer (pannig left = open, right = close)
      // and clean our temp values
      nDrawer.open = true;
      if (ev.isFinal) {
        if (nDrawer.direction === 'left') {
          hide();
        } else {
          show();
        }
        nDrawer.endTrue = false;
        nDrawer.holdingDrawerPosition = null;
      } else {
        nDrawer.endTrue = true;
      }
    };

    // Fired on touch end event
    const touchEnd = element => {
      // listen for touch end event on touch devices
      element.addEventListener(
        'touchend',
        e => {
          // get the touch reference
          const touchobj = e.changedTouches[0]; // reference first touch point for this event
          const isBigger = touchobj.clientX > nDrawer.maxWidth / 2;
          const isLeft = nDrawer.direction === 'left';
          const isRight = nDrawer.direction === 'right';
          const endTrue = nDrawer.endTrue;
          if (endTrue) {
            if ((isBigger && isLeft) || (isBigger && isRight)) {
              show();
            } else if ((!isBigger && isLeft) || (!isBigger && isRight)) {
              hide();
            }
          }
          // clean up ours temp variables
          nDrawer.direction = 'false';
          nDrawer.endTrue = false;
          nDrawer.holdingDrawerPosition = null;
          // e.preventDefault();
        },
        false
      );
    };

    // Initialize the drawer
    const init = () => {
      swipe = document.getElementById('swipe-stripe');
      swipeH = new Hammer(swipe);
      body = document.body;
      bodyH = new Hammer(body);
      drawer = document.getElementById('drawer');
      drawerH = new Hammer(drawer);
      drawerDimm = document.getElementById('drawer-dimm');
      drawerDimmH = new Hammer(drawerDimm);
      drawerDimm.addEventListener('click', e => {
        if (nDrawer.open) {
          e.preventDefault();
          hide();
        }
      });
      deviceW = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      deviceH = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      nDrawer.maxWidth =
        nDrawer.maxWidth > deviceW - 56 ? deviceW - 56 : nDrawer.maxWidth;
      drawer.style.width = nDrawer.maxWidth + 'px';
      drawer.style.webkitTransform =
        'translate(-' + nDrawer.maxWidth + 'px,0)' + 'translateZ(0)';
      drawer.style.msTransform = drawer.style.MozTransform = drawer.style.OTransform =
        'translateX(-' + nDrawer.maxWidth + 'px)';
      // listen to resize event, mainly for updating size of drawer when changing view portrait <-> landscape
      window.onresize = () => {
        deviceW = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        deviceH = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
        nDrawer.maxWidth =
          nDrawer.maxWidth > deviceW - 56 ? deviceW - 56 : nDrawer.maxWidth;
        drawer.style.width = nDrawer.maxWidth + 'px';
        if (!nDrawer.open) {
          drawer.style.webkitTransform =
            'translate(-' + nDrawer.maxWidth + 'px,0)' + 'translateZ(0)';
          drawer.style.msTransform = drawer.style.MozTransform = drawer.style.OTransform =
            'translateX(-' + nDrawer.maxWidth + 'px)';
        }
      };
      drawerH.on('panleft panright', ev => {
        if (nDrawer.open) {
          move(ev, true);
        }
      });
      swipeH.on('panright panleft', ev => {
        move(ev);
      });
      drawerDimmH.on('panleft panright', ev => {
        if (nDrawer.open) {
          move(ev);
        }
      });
      touchEnd(swipe);
      touchEnd(drawer);
      touchEnd(drawerDimm);
    };
    init();
  }
}
