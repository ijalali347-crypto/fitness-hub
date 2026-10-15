import test from 'node:test';
import assert from 'node:assert/strict';
import {movementIds,movementSvg,poseAt} from '../src/movement.js';
import {exercises} from '../src/data.js';
test('every exercise has a finite, changing mannequin pose',()=>{assert.deepEqual([...movementIds].sort(),Object.keys(exercises).sort());for(const id of movementIds){let first=poseAt(id,0),next=poseAt(id,.25);assert.notDeepEqual(first,next);for(let f=0;f<1;f+=.05){const p=poseAt(id,f);for(const joint of Object.values(p))for(const n of joint)assert.ok(Number.isFinite(n)&&n>=0&&n<=220,`${id}: joint outside stage`);}assert.equal(movementSvg(id,0).includes('NaN'),false);assert.equal(movementSvg(id,0),movementSvg(id,1));}});
test('support points remain stable during squat, push-up and bridge',()=>{for(const [id,points] of [['squat',['ankleL','ankleR']],['wall',['handL','handR','ankleL','ankleR']],['bridge',['head','shoulderL','shoulderR','ankleL','ankleR']],['row',['handL','ankleL','ankleR']]])for(const key of points)assert.deepEqual(poseAt(id,0)[key],poseAt(id,.5)[key],`${id} ${key} moved`);});
test('dumbbell curl keeps elbows stable and raises both hands',()=>{const a=poseAt('curl',0),b=poseAt('curl',.5);for(const k of ['elbowL','elbowR'])assert.deepEqual(a[k],b[k]);for(const k of ['handL','handR'])assert.ok(b[k][1]<a[k][1]);});
