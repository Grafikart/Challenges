import "./style.css";

function between(val: number, min: number, max: number) {
  return Math.max(min, Math.min(val, max));
}

function scaling(x: number) {
  return between(-0.2 * Math.pow(x, 2) + 1.05, 0, 1);
}

enum Direction {
  Left = "right",
  Right = "left",
  Up = "bottom",
  Down = "top",
  None = "center",
}

enum Position {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
}

class MacDock {
  private root: HTMLElement;
  private icons: HTMLElement[];
  private iconSize: number;
  private mousePosition: number = 0;
  private scale: number = 0.5;
  private position: Position;

  constructor(
    el: HTMLElement,
    { position = Position.Left }: { position: Position }
  ) {
    this.root = el;
    this.position = position;
    this.icons = Array.from(el.children) as HTMLElement[];
    this.iconSize = this.icons[0].offsetWidth;
    el.addEventListener("mousemove", this.handleMouseMove.bind(this));
    el.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
    el.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
  }

  get isVertical() {
    return [Position.Left, Position.Right].includes(this.position);
  }

  handleMouseMove(e: MouseEvent) {
    this.mousePosition = between(
      this.isVertical
        ? (e.clientY - this.root.offsetTop) / this.iconSize
        : (e.clientX - this.root.offsetLeft) / this.iconSize,
      0,
      this.icons.length
    );

    this.scaleIcons();
  }

  scaleIcons() {
    const selectedIndex = Math.floor(Math.abs(this.mousePosition));
    const centerOffset = this.mousePosition - selectedIndex - 0.5;
    const baseOffset = this.scaleFromDirection(
      selectedIndex,
      Direction.None,
      -centerOffset * this.iconSize * this.scale
    );
    let offset = baseOffset * (0.5 - centerOffset);
    for (let i = selectedIndex + 1; i < this.icons.length; i++) {
      offset += this.scaleFromDirection(
        i,
        this.isVertical ? Direction.Down : Direction.Right,
        offset
      );
    }
    offset = baseOffset * (0.5 + centerOffset);
    for (let i = selectedIndex - 1; i >= 0; i--) {
      offset += this.scaleFromDirection(
        i,
        this.isVertical ? Direction.Up : Direction.Left,
        -offset
      );
    }
  }

  scaleFromDirection(
    index: number,
    direction: Direction,
    offset: number
  ): number {
    const icon = this.icons[index];
    const x = this.mousePosition - index - 0.5;
    const scale = scaling(x) * this.scale;
    icon.style.setProperty(
      "transform",
      `translate${this.isVertical ? "Y" : "X"}(${offset}px) scale(${scale + 1})`
    );
    icon.style.setProperty("transform-origin", `${direction} ${this.position}`);
    return scale * this.iconSize;
  }

  handleMouseLeave() {
    this.icons.forEach((icon) => {
      icon.style.removeProperty("transform");
      icon.style.setProperty("transition", "transform .1s");
    });
  }

  handleMouseEnter() {
    this.icons.forEach((icon) => {
      icon.style.setProperty("transition", "transform .1s");
    });
    window.setTimeout(() => {
      this.icons.forEach((icon) => {
        icon.style.removeProperty("transition");
      });
    }, 100);
  }
}

new MacDock(document.querySelector(".dock__wrapper--bottom .dock")!, {
  position: Position.Bottom,
});
new MacDock(document.querySelector(".dock__wrapper--top .dock")!, {
  position: Position.Top,
});
new MacDock(document.querySelector(".dock__wrapper--left .dock")!, {
  position: Position.Left,
});
new MacDock(document.querySelector(".dock__wrapper--right .dock")!, {
  position: Position.Right,
});
