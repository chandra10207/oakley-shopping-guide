
// Script to change flag

function changeFlag()
{
	var img=document.getElementById("flagImage");
	var currentCountry=document.getElementById("flag");
	img.setAttribute("src",currentCountry[currentCountry.selectedIndex].getAttribute("value"));
}



/// script for tags
var taabs = new Tabs();
taabs.selectTab();

function Tabs() {
    this.listofTab = document.getElementById("tabid");

    this.tabCollection = [];
    this.ContentdivCollection = [];
    this.selectedTabIndex = 0;
    this.child;
    var that = this;

    this.selectTab = function () {
        for (var i = 0; i < that.listofTab.childElementCount; i++) {
            that.currenttab = that.listofTab.children[i];
            
            that.tabCollection.push(that.currenttab);

            /*event handiling*/
            that.currenttab.onclick = (function (i) {
                return function () {
                    that.selectedTabIndex = i;
                    for (var j = 0; j < that.tabCollection.length; j++) {
                        that.tabCollection[j].className = "";
//                        alert(i)
                        document.getElementById("tab" +j).style.display = 'none';
                    }
                    that.tabCollection[that.selectedTabIndex].className = "activetab";
                    document.getElementById("tab" + that.selectedTabIndex).style.display = 'block';
                 
                };

            })(i);

        }
    };

}