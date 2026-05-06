const fs = require('fs');
const files = ['admin.html','blog-post.html','blog.html','cart.html','category.html','checkout.html','index.html','login.html','orders.html','post.html','price-board.html','product.html','profile.html'];
let n = 0;
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  if (c.includes('phones-images.js')) { console.log('skip', f); continue; }
  const re = /(<script src="assets\/data\/products\.js"><\/script>)/;
  if (!re.test(c)) { console.log('no products.js in', f); continue; }
  c = c.replace(re, '<script src="assets/data/phones-images.js"></script>\n$1');
  fs.writeFileSync(f, c, 'utf8');
  n++;
}
console.log('Updated', n);
