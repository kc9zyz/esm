cd scripts;
mkdir -p min
for f in *.js; do 
   short=${f%.js};
   if [[ ${f: -7} != ".min.js" ]];then
      ../node_modules/uglify-js/bin/uglifyjs $f > min/$short.min.js;
      chmod 777 min/$short.min.js;
   else
      cp $f min/;
      chmod 777 min/$short.js;
   fi
done
cd ../css;
mkdir -p min
for f in *.css; do 
   short=${f%.css};
   if [[ ${f: -8} != ".min.css" ]];then
      ../node_modules/uglifycss/uglifycss $f > min/$short.min.css;
      chmod 777 min/$short.min.css;
   else
      cp $f min/;
      chmod 777 min/$short.css;
   fi
done
