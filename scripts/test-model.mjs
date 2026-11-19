import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import ts from 'typescript';
const root=path.resolve(import.meta.dirname,'..');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'tomo-model-'));
try{
 for(const name of ['data','model']){const result=ts.transpileModule(fs.readFileSync(path.join(root,'src',`${name}.ts`),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});fs.writeFileSync(path.join(dir,`${name}.cjs`),result.outputText.replace('require("./data")','require("./data.cjs")'));}
 const require=createRequire(import.meta.url);const m=require(path.join(dir,'model.cjs'));
 let lines=m.addLine([],'cementerio-es');lines=m.addLine(lines,'cementerio-es');assert.deepEqual(lines,[{editionId:'cementerio-es',quantity:2}]);
 lines=m.addLine(lines,'cementerio-en');assert.equal(lines.length,2);assert.equal(m.subtotal(lines),286*2+321);
 assert.deepEqual(m.addLine(lines,'sombra-en'),lines,'Una edición no disponible no debe entrar al carrito');
 assert.deepEqual(m.changeEdition(lines,'cementerio-es','sombra-es'),lines,'No cambiar entre libros diferentes');
 lines=m.changeEdition(lines,'cementerio-es','cementerio-en');assert.deepEqual(lines,[{editionId:'cementerio-en',quantity:3}]);assert.equal(m.subtotal(lines),963);
 let state=m.initialStore();assert.deepEqual(m.goalStats(state),{read:4,percent:33,remaining:8});state=m.setReading(state,'cien','Leído');assert.deepEqual(m.goalStats(state),{read:5,percent:42,remaining:7});state=m.setReading(state,'cien','Leído');assert.equal(m.goalStats(state).read,5,'No contar dos veces');state=m.setReading(state,'cien','Leyendo');assert.equal(m.goalStats(state).read,4);state.goal=5;assert.equal(m.goalStats(state).percent,80);
 state.reading.cementerio.completedYear=m.currentYear()-1;assert.equal(m.goalStats(state).read,3,'Solo año actual');
 state.cart=lines;state.selected.cementerio='cementerio-en';const restored=m.restoreStore(JSON.parse(JSON.stringify(state)));assert.deepEqual(restored.cart,lines);assert.equal(restored.selected.cementerio,'cementerio-en');assert.equal(restored.goal,5);
 const bad=m.restoreStore({goal:-5,cart:[{editionId:'sombra-en',quantity:1},{editionId:'cementerio-es',quantity:-1},{editionId:'cementerio-es',quantity:2},{editionId:'cementerio-es',quantity:3}]});assert.equal(bad.goal,12);assert.deepEqual(bad.cart,[{editionId:'cementerio-es',quantity:5}]);assert.deepEqual(m.restoreStore(null),m.initialStore());
 console.log('14 comprobaciones del modelo: correctas (ediciones, carrito, restauración y meta anual).');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
