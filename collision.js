export function collidePointWithCircle(point, circle) {
  let { x, y } = point;
  let { cx, cy, r } = circle;

  let katx = cx - x;
  let katy = cy - y;

  //Math.sqrt its squared root
  let hyp = Math.sqrt(katx ** 2 + katy ** 2);
  if (hyp <= r) {
    return true;
  } else {
    return false;
  }
}

export let dawa = 42;
