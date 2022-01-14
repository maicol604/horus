import React from 'react';
import functionPlot from "function-plot";


const sample = [[6.4,3807.36085151104],
  [6.45,3925.08815281955],
  [6.5,4041.55684226877],
  [6.55,4156.7669198587],
  [6.6,4270.71838558933],
  [6.65,4383.41123946067],
  [6.7,4494.84548147272],
  [6.75,4605.02111162548],
  [6.8,4713.93812991894],
  [6.85,4821.59653635311],
  [6.9,4927.99633092799],
  [6.95,5033.13751364358],
  [7,5137.02008449987],
  [7.05,5239.64404349688],
  [7.1,5341.00939063458],
  [7.15,5441.116125913],
  [7.2,5539.96424933212],
  [7.25,5637.55376089196],
  [7.3,5733.8846605925],
  [7.35,5828.95694843374],
  [7.4,5922.7706244157],
  [7.45,6015.32568853836],
  [7.5,6106.62214080173],
  [7.55,6196.65998120581],
  [7.6,6285.43920975059],
  [7.65,6372.95982643609],
  [7.7,6459.22183126228],
  [7.75,6544.22522422919],
  [7.8,6627.97000533681],
  [7.85,6710.45617458513],
  [7.9,6791.68373197416],
  [7.95,6871.6526775039],
  [8,6950.36301117435],
  [8.05,7027.8147329855],
  [8.1,7104.00784293736],
  [8.15,7178.94234102993],
  [8.2,7252.61822726321],
  [8.25,7325.03550163719],
  [8.3,7396.19416415189],
  [8.35,7466.09421480729],
  [8.4,7534.73565360339],
  [8.45,7602.11848054021],
  [8.5,7668.24269561773],
  [8.55,7733.10829883596],
  [8.6,7796.7152901949],
  [8.65,7859.06366969454],
  [8.7,7920.15343733489],
  [8.75000000000001,7979.98459311595],
  [8.80000000000001,8038.55713703772],
  [8.85000000000001,8095.8710691002],
  [8.90000000000001,8151.92638930338],
  [8.95000000000001,8206.72309764727],
  [9.00000000000001,8260.26119413187],
  [9.05000000000001,8312.54067875717],
  [9.10000000000001,8363.56155152318],
  [9.15000000000001,8413.32381242991],
  [9.20000000000001,8461.82746147733],
  [9.25000000000001,8509.07249866547],
  [9.30000000000001,8555.05892399431],
  [9.35000000000001,8599.78673746386],
  [9.40000000000001,8643.25593907412],
  [9.45000000000002,8685.46652882508],
  [9.50000000000002,8726.41850671676],
  [9.55000000000002,8766.11187274914],
  [9.60000000000002,8804.54662692222],
  [9.65000000000002,8841.72276923602],
  [9.70000000000002,8877.64029969052],
  [9.75000000000002,8912.29921828573],
  [9.80000000000002,8945.69952502165],
  [9.85000000000002,8977.84121989828],
  [9.90000000000002,9008.72430291561],
  [9.95000000000002,9038.34877407365],
  [10,9066.7146333724],
  [10.05,9093.82188081186],
  [10.1,9119.67051639202],
  [10.15,9144.26054011289],
  [10.2,9167.59195197447],
  [10.25,9189.66475197676],
  [10.3,9210.47894011975],
  [10.35,9230.03451640345],
  [10.4,9248.33148082786],
  [10.45,9265.36983339297],
  [10.5,9281.1495740988],
  [10.55,9295.67070294533],
  [10.6,9308.93321993257],
  [10.65,9320.93712506051],
  [10.7,9331.68241832917],
  [10.75,9341.16909973853],
  [10.8,9349.3971692886],
  [10.85,9356.36662697937],
  [10.9,9362.07747281086],
  [10.95,9366.52970678305],
  [11,9369.72332889595],
  [11.05,9371.65833914955],
  [11.1,9372.33473754387],
  [11.15,9371.75252407889],
  [11.2,9369.91169875462],
  [11.25,9366.81226157105],
  [11.3,9362.4542125282],
  [11.35,9356.83755162605],
  [11.4,9349.96227886461],
  [11.45,9341.82839424388],
  [11.5,9332.43589776385],
  [11.55,9321.78478942453],
  [11.6,9309.87506922592],
  [11.65,9296.70673716802],
  [11.7,9282.27979325082],
  [11.75,9266.59423747433],
  [11.8,9249.65006983855],
  [11.8500000000001,9231.44729034348],
  [11.9000000000001,9211.98589898911],
  [11.9500000000001,9191.26589577546],
  [12.0000000000001,9169.28728070251],
  [12.0500000000001,9146.05005377026],
  [12.1000000000001,9121.55421497873],
  [12.1500000000001,9095.7997643279],
  [12.2000000000001,9068.78670181778],
  [12.2500000000001,9040.51502744836],
  [12.3000000000001,9010.98474121966],
  [12.3500000000001,8980.19584313166],
  [12.4000000000001,8948.14833318437],
  [12.4500000000001,8914.84221137779],
  [12.5000000000001,8880.27747771191],
  [12.5500000000001,8844.45413218675],
  [12.6000000000001,8807.37217480229],
  [12.6500000000001,8769.03160555853],
  [12.7000000000001,8729.43242445549],
  [12.7500000000001,8688.57463149315],
  [12.8000000000001,8646.45822667152],
  [12.8500000000001,8603.0832099906],
  [12.9000000000001,8558.44958145038],
  [12.9500000000001,8512.55734105088],
  [13.0000000000001,8465.40648879208],
  [13.0500000000001,8416.99702467398],
  [13.1000000000001,8367.3289486966],
  [13.1500000000001,8316.40226085992],
  [13.2000000000001,8264.21696116395],
  [13.2500000000001,8210.77304960869],
  [13.3000000000001,8156.07052619413],
  [13.3500000000001,8100.10939092029],
  [13.4000000000001,8042.88964378715],
  [13.4500000000001,7984.41128479472],
  [13.5000000000001,7924.67431394299],
  [13.5500000000001,7863.67873123197],
  [13.6000000000001,7801.42453666166],
  [13.6500000000001,7737.91173023206],
  [13.7000000000001,7673.14031194317],
  [13.7500000000001,7607.11028179498],
  [13.8000000000001,7539.8216397875],
  [13.8500000000001,7471.27438592073],
  [13.9000000000001,7401.46852019466],
  [13.9500000000001,7330.40404260931],
  [14.0000000000001,7258.08095316466],
  [14.0500000000001,7184.49925186072],
  [14.1000000000001,7109.65893869748],
  [14.1500000000001,7033.56001367496],
  [14.2000000000001,6956.20247679314],
  [14.2500000000001,6877.58632805202],
  [14.3000000000001,6797.71156745162],
  [14.3500000000001,6716.57819499192],
  [14.4000000000001,6634.18621067293],
  [14.4500000000001,6550.53561449465],
  [14.5000000000001,6465.62640645708],
  [14.5500000000001,6379.45858656021],
  [14.6000000000001,6292.03215480405],
  [14.6500000000001,6203.3471111886],
  [14.7000000000001,6113.40345571386],
  [14.7500000000001,6022.20118837982],
  [14.8000000000001,5929.74030918649],
  [14.8500000000001,5836.02081813387],
  [14.9000000000001,5741.04271522196],
  [14.9500000000001,5644.80600045075],
  [15.0000000000001,5547.31067382025],
  [15.0500000000001,5448.55673533046],
  [15.1000000000001,5348.54418498138],
  [15.1500000000001,5247.273022773],
  [15.2000000000001,5144.74324870533],
  [15.2500000000001,5040.95486277837],
  [15.3000000000001,4935.90786499212],
  [15.3500000000001,4829.60225534657],
  [15.4000000000001,4722.03803384173],
  [15.4500000000001,4613.2152004776],
  [15.5000000000001,4503.13375525418],
  [15.5500000000001,4391.79369817146],
  [15.6000000000001,4279.19502922946],
  [15.6500000000001,4165.33774842815],
  [15.7000000000001,4050.22185576756],
  [15.7500000000001,3933.84735124768],
  [15.8000000000001,3816.2142348685],];


export default ({points, xAxis, yAxis, annotations}) => {

    React.useEffect(()=>{
        functionPlot({
            target: '#test',
            data: [
                {
                    points: [
                        ...points
                    ],
                    fnType: 'points',
                    graphType: 'scatter',
                    //graphType: 'polyline',
                    color: 'blue'
                },
                // {
                //     points: [
                //         [8.56,7681.87].reverse()
                //     ],
                //     fnType: 'points',
                //     graphType: 'scatter',
                //     //graphType: 'polyline',
                //     color: 'purple'
                // },
                // {
                //     points: [
                //         [10.22,9075.34].reverse()
                //     ],
                //     fnType: 'points',
                //     graphType: 'scatter',
                //     //graphType: 'polyline',
                //     color: 'orange'
                // },
                // {
                //     points: [
                //         [11.06,9255.13].reverse()
                //     ],
                //     fnType: 'points',
                //     graphType: 'scatter',
                //     //graphType: 'polyline',
                //     color: 'green'
                // }
            ],
            // yAxis: {domain: [5, 17]},
            // xAxis: {domain: [3000,10000]},
            yAxis: yAxis,
            xAxis: xAxis,
            annotations: [
                ...annotations
            ]
        })
    },[])

    return (
        <div>
            <div id='test'/>
        </div>
    )
}