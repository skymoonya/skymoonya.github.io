'use strict'
let gameData=[
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
],//数据
score=0,//得分
counter=0,//计数
newPosition,//新生成数据的位置
combinePosition=[],//合并了数字的位置
gameOver=false;//游戏是否结束

$(window).keydown(function(event){
	let copyData=dataCopy();
	let keyCode=event.keyCode, moveScore=0;
	if(!gameOver){
		if(keyCode===38||keyCode===87){
			moveScore=up();
		}else if(keyCode===40||keyCode===83){
			moveScore=down();
		}else if(keyCode===37||keyCode===65){
			moveScore=left();
		}else if(keyCode===39||keyCode===68){
			moveScore=right();
		}
	}
	if(moveScore!==0){
		counter++;
		score+=moveScore;
	}
	if(!dataCompare(copyData)){
		produceData();
		render();
	}
	gameOver=isGameOver(copyData);
	if(gameOver){
		$('.game-container .shade').css('display','block');
	}
});
function up(data=gameData){
	let upScore=0;
	combinePosition.length=0;
	dataMove('up');
	//合并非0数
	for(let i=1;i<4;i++){
		for (let j=0;j<4;j++){
			if(data[i-1][j]===data[i][j]&&data[i][j]!==0){
				data[i-1][j]=data[i-1][j]*2;
				data[i][j]=0;
				upScore+=data[i-1][j];
				combinePosition.push(''+(i-1)+j);
				if(i===1&&data[2][j]!==data[3][j] || i===2){//合并之后消除可能产生的0
					for(let k=i+1;k<4;k++){
						if(data[k-1][j]===0&&data[k][j]!==0){
							data[k-1][j]=data[k][j];
							data[k][j]=0;
						}
					}
				}
			}
		}
	}
	return upScore;
}
function down(data=gameData){
	let downScore=0;
	combinePosition.length=0;
	dataMove('down');
	for(let i=2;i>-1;i--){
		for (let j=0;j<4;j++){
			if(data[i+1][j]===data[i][j]&&data[i][j]!==0){
				data[i+1][j]=data[i+1][j]*2;
				data[i][j]=0;
				downScore+=data[i+1][j];
				combinePosition.push(''+(i+1)+j);
				if(i===2&&data[1][j]!==data[0][j] || i===1){//合并之后消除可能产生的0
					for(let k=i-1;k>-1;k--){
						if(data[k+1][j]===0&&data[k][j]!==0){
							data[k+1][j]=data[k][j];
							data[k][j]=0;
						}
					}
				}
			}
		}
	}
	return downScore;
}
function left(data=gameData){
	let leftScore=0;
	combinePosition.length=0;
	dataMove('left');
	for(let i=0;i<4;i++){
		for (let j=1;j<4;j++){
			if(data[i][j-1]===data[i][j]&&data[i][j]!==0){
				data[i][j-1]=data[i][j-1]*2;
				data[i][j]=0;
				leftScore+=data[i][j-1];
				combinePosition.push(''+i+(j-1));
				if(j===1&&data[i][2]!==data[i][3] || j===2){//合并之后消除可能产生的0
					for(let k=j+1;k<4;k++){
						if(data[i][k-1]===0&&data[i][k]!==0){
							data[i][k-1]=data[i][k];
							data[i][k]=0;
						}
					}
				}
			}
		}
	}
	return leftScore;
}
function right(data=gameData){
	let rightScore=0;
	combinePosition.length=0;
	dataMove('right');
	for(let i=0;i<4;i++){
		for (let j=2;j>-1;j--){
			if(data[i][j+1]===data[i][j]&&data[i][j]!==0){
				data[i][j+1]=data[i][j+1]*2;
				data[i][j]=0;
				rightScore+=data[i][j+1];
				combinePosition.push(''+i+(j+1));
				if(j===2&&data[i][1]!==data[i][0] || j===1){//合并之后消除可能产生的0
					for(let k=j-1;k>-1;k--){
						if(data[i][k+1]===0&&data[i][k]!==0){
							data[i][k+1]=data[i][k];
							data[i][k]=0;
						}
					}
				}
			}
		}
	}
	return rightScore;
}
//非0数据向0数据位置移动
function dataMove(direction,data=gameData){
	switch(direction){
		case 'up':
			for(let i=0;i<3;i++){
				for (let j=0;j<4;j++){
					if(data[i][j]===0){
						for(let k=i+1;k<4;k++){
							if(data[k][j]!==0){
								data[i][j]=data[k][j];
								data[k][j]=0;
								break;
							}
						}
					}
				}
			}
			break;
		case 'down':
			for(let i=3;i>0;i--){
				for (let j=0;j<4;j++){
					if(data[i][j]===0){
						for(let k=i-1;k>-1;k--){
							if(data[k][j]!==0){
								data[i][j]=data[k][j];
								data[k][j]=0;
								break;
							}
						}
					}
				}
			}
			break;
		case 'left':
			for(let i=0;i<4;i++){
				for (let j=0;j<3;j++){
					if(data[i][j]===0){
						for(let k=j+1;k<4;k++){
							if(data[i][k]!==0){
								data[i][j]=data[i][k];
								data[i][k]=0;
								break;
							}
						}
					}
				}
			}
			break;
		case 'right':
			for(let i=0;i<4;i++){
				for (let j=3;j>0;j--){
					if(data[i][j]===0){
						for(let k=j-1;k>-1;k--){
							if(data[i][k]!==0){
								data[i][j]=data[i][k];
								data[i][k]=0;
								break;
							}
						}
					}
				}
			}
			break;
	}
}
//复制一份原有数据
function dataCopy(data=gameData){
	let copyData=[[],[],[],[]];
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			copyData[i][j]=data[i][j];
		}
	}
	return copyData;
}
//复制数据与原有数据比较
function dataCompare(copyData, data=gameData){
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			if(copyData[i][j]!==data[i][j]){
				return false;
			}
		}
	}
	return true;
}
//通过对复制数据调用上下左右四个方法判断游戏是否结束
function isGameOver(data){
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			if(data[i][j]===0){
				return false;
			}
		}
	}
	if(up(data)) return false;
	if(down(data)) return false;
	if(left(data)) return false;
	if(right(data)) return false;
	return true;
}
//把数据更新到页面上
function render(){
	for(let i=0;i<4;i++){
		for (let j=0;j<4;j++){
			$(`.game-container .row-${i} div`).eq(j)
				.html(gameData[i][j]===0?'':gameData[i][j]).removeClass().addClass(`num-${gameData[i][j]}`);
		}
	}
	$('#score').text(score);
	$(`.game-container .row-${newPosition[0]} div`).eq(newPosition[1]).addClass('num-new');
	combinePosition.forEach(function(cp){
		let p=cp.slice('');
		$(`.game-container .row-${p[0]} div`).eq(p[1]).addClass('num-combine');
	})
}
//新生成数据
function produceData(){
	let list=[];
	for(let i=0;i<4;i++){
		for (let j=0;j<4;j++){
			if(gameData[i][j]===0){
				list.push(''+i+j);
			}
		}
	}
	if(list.length>0){
		let r=list[Number.parseInt(Math.random()*list.length)].slice('');
		newPosition=r;
		if(counter<20){
			gameData[r[0]][r[1]]=2;
		}else{
			gameData[r[0]][r[1]]=Math.random()*10>2?2:4;
		}
	}
}
produceData();
render();

$('#new-game,#again').click(function(){
	reset();
	produceData();
	render();
});
function reset(){
	gameData=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
	];
	score=0;
	counter=0;
	$('.game-container .shade').css('display','none');
}