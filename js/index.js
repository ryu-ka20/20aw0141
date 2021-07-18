var indexJs = {
	bannerImgs: [
		{"idx":0,"img":"./img/news1.jpg", "title": "2020.12.03", "text": "12/4(金)から練習場営業時間を下記の通りとさせていただきます。\n全日　7:00～23:00"},
		{"idx":1,"img":"./img/news2.jpg", "title": "2020.06.13", "text": "トップトレーサーレンジ大好評稼働中!!トップトレーサーレンジを使用して飛距離,方向性,ボール速度が測定でき,バーチャルゴルフでラウンドもできます!!"},
		{"idx":2,"img":"./img/news3.jpg", "title":"2020.04.26", "text":"新型コロナウイルス感染予防対策について"}
	],
	LI_WIDTH: 0, 
	LI_PADDING: 0, 
	LEFT_OFFSET: 0, 
	timer: null,	
	DURATION:1000, 
	WAIT: 2000, 
	isCanSlide: true, 
	
	init: function(){
		this.LI_WIDTH=parseFloat(0.5 * parseFloat($("#banner-wrapper").css("width")));
		this.LI_PADDING = 0.1 * this.LI_WIDTH;
		
		if(this.bannerImgs.length <= 0){
			console.error("slide banners can not be null");
		}
		if(this.bannerImgs.length === 1){
			this.bannerImgs[1] = {...this.bannerImgs[0], "idx": 1};
			this.bannerImgs[2] = {...this.bannerImgs[0], "idx": 2};
			this.bannerImgs[3] = {...this.bannerImgs[0], "idx": 3};
		}
		if(this.bannerImgs.length === 2){
			this.bannerImgs[2] = {...this.bannerImgs[0], "idx": 2};
			this.bannerImgs[3] = {...this.bannerImgs[1], "idx": 3};
		}
		if(this.bannerImgs.length === 3){
			this.bannerImgs[3] = {...this.bannerImgs[0], "idx": 3};
			this.bannerImgs[4] = {...this.bannerImgs[1], "idx": 4};
			this.bannerImgs[5] = {...this.bannerImgs[2], "idx": 5};
		}
		this.updateView();
		$("#banner-imgs").css("width", (this.LI_WIDTH + 2 * this.LI_PADDING) * this.bannerImgs.length + "px");
		var li_height_max = 0; 
		$(".banner-img").each(function(){
			var h = $(this).innerHeight();
			li_height_max = li_height_max < h ? h : li_height_max;
		})
		$("#banner-wrapper").css("height", li_height_max + "px");
		// 鼠标移入后停止自动轮播， 移出继续自动轮播（PC）
		$("#banner-wrapper").hover(
			function(){this.isCanSlide=false;}.bind(this),
			function(){this.isCanSlide=true;}.bind(this)
		);
		// 鼠标指针移入事件（PC）
		$("#banner-block").on("mouseover","li:not(.hover)",function(e){
			this.slide($(e.target).attr("class").split(' ')[1]-$(e.target).siblings(".hover").attr("class").split(' ')[1]);
		}.bind(this));
		// 点击事件（PC端，移动端）
		$("#banner-block").on("click","li:not(.hover)",function(e){
			this.slide($(e.target).attr("class").split(' ')[1]-$(e.target).siblings(".hover").attr("class").split(' ')[1]);
		}.bind(this));
		// 触屏开始事件（移动端）
		$("#banner-block").on("touchstart","li:not(.hover)",function(e){
			this.isCanSlide = false;
		}.bind(this));
		// 触屏开始事件(移动端)
		$("#banner-block").on("touchend","li:not(.hover)",function(e){
			this.slide($(e.target).attr("class").split(' ')[1]-$(e.target).siblings(".hover").attr("class").split(' ')[1]);
			this.isCanSlide = true;
		}.bind(this));
		this.autoSlide();
	},
	// 更新视图（将数组bannerImgs更新到HTML视图上）
	updateView:function(){
		var html = "";
		var idx = "";
		for(var i = 0; i < this.bannerImgs.length; i++){
			html += "<li class='banner-img' style='display:" + "inline-block" + "; width:" + this.LI_WIDTH + "px; padding: 0 "+ this.LI_PADDING + "px'><img src='" + this.bannerImgs[i].img + "' height='" + 0.6 * this.LI_WIDTH + "'/><div class=\"content\"><h4>" + this.bannerImgs[i].title + "</h4><pre style='white-space: pre-wrap;font-size:'11px';line-height:'15px';word-spacing:'13px';font-family:'游ゴシック';>" + this.bannerImgs[i].text + "</pre></div>" + "</li>";
			idx += "<li class='banner-idx " + i + "'></li>";
		}
		$("#banner-imgs").html(html);
		this.LEFT_OFFSET = parseFloat($("#banner-wrapper").css("width")) - (this.LI_WIDTH + 2 * this.LI_PADDING);
		$("#banner-imgs").css("left", -1 * this.LEFT_OFFSET);
		$("#banner-block").html(idx);
		$("#banner-block>li:eq("+this.bannerImgs[0].idx+")").addClass("hover").siblings(".hover").removeClass("hover");
	},
	// 自动轮播
	autoSlide: function(){
		if(this.timer){
			this.timer = null;
		}
		this.timer=setTimeout(
			function(){
				this.isCanSlide ? this.slide(1) : this.autoSlide();
			}.bind(this), this.WAIT
		);
	},
	// 轮播
	slide: function(n){
		clearTimeout(this.timer);//停止一次性定时器
		this.timer=null;
		$("#banner-imgs").stop(true);// 停止动画
		if(n < 0){//ul右移，li的img左移，先改数组，再移动
			n *= -1;
			this.bannerImgs=this.bannerImgs.splice(this.bannerImgs.length - n, n).concat(this.bannerImgs);
			this.updateView();
			var left=parseFloat($("#banner-imgs").css("left"));
			$("#banner-imgs").css("left",left - n * this.LI_WIDTH);
			$("#banner-imgs").animate({left: -1 * this.LEFT_OFFSET},this.DURATION,this.autoSlide.bind(this));
		}else{//否则，ul左移，li右移，先移动，再改数组
			$("#banner-imgs").animate({left:-n * (this.LI_WIDTH + 2 * this.LI_PADDING) - this.LEFT_OFFSET + "px"},this.DURATION,this.endSlide.bind(this,n));
		}
	},
	// animate的回调函数，重改数组，更新视图
	endSlide: function(n){
		this.bannerImgs=this.bannerImgs.concat(this.bannerImgs.splice(0,n));
		this.updateView();
		$("#banner-imgs").css("left", -1 * this.LEFT_OFFSET);
		this.autoSlide();
	}
}
indexJs.init();