import UAParser from "ua-parser-js";


const support_map = {
    // https://caniuse.com/#feat=webgl
    webgl : {"IE":"11","Edge":"12","Firefox":"4","Chrome":"8","Safari":"5.1","iOS Safari":"8","Android Browser":"67","Chrome for Android":"70", "Samsung Internet":"4"},
    canvas2dfilter : {"IE":null,"Edge":"?","Firefox":"49","Chrome":"52","Safari":null,"iOS Safari":null,"Android Browser":"?","Chrome for Android":"52", "Samsung Internet":"6"},
    mediarecorder : {"IE":null,"Edge":null,"Firefox":"29","Chrome":"49","Safari":null,"iOS Safari":null,"Android Browser":null,"Chrome for Android":"70","Samsung Internet":"5"}
}

function showUserBrowser() {
    let uaArea = document.getElementById("ua");

    if (!uaArea) {
        const div = document.createElement("div");
        div.id = "ua";
        document.body.append(div);
        uaArea = div;
    }

    const parser = new UAParser();
    const {browser, device, os, ua} = parser.getResult();
    const str = 
    `현재 디바이스 정보 <br>
    os : (${device.type === "mobile" ? "M" : "PC"}) ${os.name} ${os.version} <br>
    browser : ${browser.name} ${browser.version} <br>
    ${ua}`;
    
    uaArea.innerHTML = str;
}

function showCanIUse() {
    const support = document.querySelector(".support");
    const temp = [];
    const obj = support_map[support.dataset.value];

    for (let [key, value] of Object.entries(obj)) {
        if(value == null) {
            temp.push(`<li>${key} 미지원</li>`)
        } else if (value == "?") {
            temp.push(`<li>${key} 지원범위 확인 불가</li>`)
        } else {
            temp.push(`<li>${key} ${value} 이상 지원</li>`)
        }
    }

    support.innerHTML = temp.join("");
}

document.addEventListener("DOMContentLoaded", function() {
    showUserBrowser();
    showCanIUse();
});
