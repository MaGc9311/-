//检查无障碍是否启动
auto.waitFor()
//获取网易大神的包名
let DaShen_Package = getPackageName("网易大神"); //返回"com.netease.gl "  广告屏className android.widget.FrameLayout  广告屏后主要内容claaName androidx.viewpager.widget.ViewPager  id home_view_pager
let DaShen = app.launchApp("网易大神");
if (DaShen) {
    app.launchApp("网易大神");
    toast("网易大神启动中！");
} else if (DaShen_Package) {
    app.launch("com.netease.gl");
    toast("网易大神启动中！");
} else {
    toast("请安装网易大神APP");
}
//跳过广告
//id("tv_next_step").waitFor()
/*
if(id("tv_next_step").exists){
let DaShen_skip = id("tv_next_step").findOne()
DaShen_skip.click()
}
*/
//点击我
let DaShen_me = id("tab_3").findOne()
while (!DaShen_me) {
    sleep(1500)
    back()
}
if (id("tab_3").exists()) {
    DaShen_me.click()
} else {
    back()
}
let DaShen_me_X = DaShen_me.bounds().centerX()
let DaShen_me_Y = DaShen_me.bounds().centerY()
//影响力签到
let click_effect = () => {
    id("tv_privilege_title").waitFor()
    //toastLog(1)
    while (!click("影响力")) { }
    //toastLog(2)
    text("LV.1").waitFor()
    //toastLog(3)
    className("android.widget.Button").click()
    back()
}
//点击关注再点击圈子
let click_circle = () => {
    id("navi_settings").waitFor()
    while (!id("layout_followed_count").findOne().click()) { }
    sleep(1000)
    click("圈子")
    sleep(1000)
}
//点击签到
let click_sign_in = () => {
    //toastLog(4)
    text("签到").findOne()
    click("签到")
    sleep(1000)
    for (let i = 0; i < 5; i++) {
        click(DaShen_me_X, DaShen_me_Y)
        sleep(250)
    }
    sleep(1000)
}
//任务执行
let exec_task = () => {
    click_effect()
    click_circle()
    while (true) {
        let sign_in = text("签到").find().length
        if (sign_in == 0) {
            className("androidx.recyclerview.widget.RecyclerView").scrollForward();
            sleep(250)
            let sign_in = text("签到").find().length
            if (sign_in == 0 && text("已经全部加载完毕").findOne(500)) {
                for (let i = 0; i < 5; i++) {
                    back()
                }
                toast("签到完毕")
                break;
            }
        } else {
            click_sign_in()
            click_circle()
        }
    }
}
exec_task()