//趋势分析
function lineZoom(ID,xData,lineData){
    // var xData=["09:00", "09:03", "09:13", "09:14", "09:24","09:34","09:44","09:54","10:04","10:14","10:24"];
    // var lineData=[
    //                 {
    //                     name:'实时IT设备电能',
    //                     type:'line',
    //                     symbolSize:8,
    //                     data:[320, 232, 301, 234, 390, 230, 310,18, 391, 234, 290, 343, 310]
    //                 },
    //                 {
    //                     name:'机房实时总电能',
    //                     type:'line',
    //                     symbolSize:8,
    //                     data:[220, 18, 391, 234, 290, 343, 310, 301, 234, 390, 230, 310,18]
    //                 },
    //             ];
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#2F4554","#C23531"],
        tooltip : {
            trigger: 'axis'
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
            },
            {
                type: 'inside',
                realtime: true,
                start: 30,
                end: 70,
            }
        ],
        grid: {
            left: '15px',
            right: '45px',
            top:'25px',
            bottom: '50px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:2,
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#666"    
                },                               
                data :xData
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:"#304a5d",
                        width:2,
                    }
                },
                 splitLine:{
                    show:true,
                    lineStyle:{
                        color:"#CCC",
                        width:1,
                        type:"solid",
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#666",
					formatter: '{value}'
                }
            }
        ],
        series : lineData
    };
    myChart.setOption(option, true);
    
    return myChart; 
}
//能效pue趋势
function areaChar(ID,xData,yData){
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color:["#49A9EE"],
        tooltip: {
            trigger: 'axis',
            formatter:'{b}<br>{c}',
        },
        grid: {
            left: '20px',
            right: '45px',
            top:'15px',
            bottom: '20px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine:{
                    lineStyle:{
                        color:"#e4e4e4",
                        width:1,
                    }
                },
                axisTick:{
                    show:false
                },  
                axisLabel:{
                    color:"#666",
					formatter: '{value}'
                },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                data :xData
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color:"#e4e4e4",
                        width:1,
                    }
                },
                 splitLine:{
                    show:false,
                    lineStyle:{
                        color:"#1c3042",
                        width:1,
                        type:"dashed",
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:"#666",
					formatter: '{value}'
                }
            }
        ],
        series : [
        {
            name:'pue趋势',
            type:'line',
            areaStyle: {normal: {color:"#DBEEFC"}},
            smooth:"true", //平滑
            symbol:"line", //不要圆圈
            symbolSize:0,
            data:yData,
        },
    ]
    };
    myChart.setOption(option, true);
    return myChart; 
}
//能效分布饼图
function pieChar(ID,dataJson){
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
    
        series : [
            {
                name:'能效分布',
                type: 'pie',
                radius : '50%',
                center: ['50%', '50%'],
                data:dataJson,
                label:{            //饼图图形上的文本标签
                    normal:{
                        show:true,
                        textStyle : {
                            fontSize : 12    //文字的字体大小
                        },
                        formatter:'{b} {d}%'

                        
                    }
                },
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart; 
}
//首页圆环
function annulus(ID,title,color,data){
    // var title="级别";
    // var color=['#e2181b','#ec7f19','#dfc027',"#23abe1"];
    // var data=[{"name":"紧急","value":"10"},{"name":"重要","value":"10"},{"name":"一般","value":"20"},{"name":"提示","value":"20"}];
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        title: {
            show: true,
            text: title,
            x:'center',
            textStyle: {
                fontSize: 14,
                color: '#fff'
            }
        },
        backgroundColor: {
            color: '#fff'
        },
        color:color,
        legend: {
                orient : 'vertical',
                x : 'left',
                y:'bottom',
                itemWidth:15,
                itemHeight:10,
                textStyle: {
                    fontSize: 10,
                    color: '#fff'
                },
            data:data                   
        },                
        tooltip : {
            trigger: 'item',
            show:true,
            formatter: "{a} <br/>{b}:{c}({d}%)"
        },
        series: [{
            name: title,
            type: 'pie',
            radius : [45, 75],
            // for funnel
            width: '30%',
            funnelAlign: 'left',
            max: 1048,
            data: data,
            itemStyle:{ 
                normal:{ 
                    label:{ 
                        show: false, 
                        formatter: '{b}:{c}({d}%)' 
                    }, 
                    labelLine :{show:true} 
                } 
            } 
        
        }]

    };
    myChart.setOption(option, true);
    return myChart; 
}
























