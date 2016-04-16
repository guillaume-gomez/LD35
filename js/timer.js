function Timer ()
{

    ///////////////////////////////////////
    // Attributs
    ///////////////////////////////////////
    var delta;
    var lastTime;
    var totalTime;
    var updateTime;

    ///////////////////////////////////////
    // Méthodes
    //////////////////////////////////////
    
    /**
    *@brief : Constructeur de la classe Timer
    **/
    this.constructor = function()
    {
        lastTime = (new Date()).getTime();
        totalTime = 0;
        updateTime = 0;
        delta = 0 ;
    }
    
    /**
    *@brief : Méthode qui lance le timer ou le relance
    **/
    this.lancer = function ()
    {
        updateTime = 0 ;
        updateFrames = 0 ;
    }
    
    /**
    *@brief : Reset 
    **/
    this.reset = function()
    {
        lastTime = (new Date()).getTime();
        totalTime = 0;
        updateTime = 0;
        delta = 0 ;
    }
    
    
    this.calculIntervalle = function ()
    {
        var  now = (new Date()).getTime();
        delta = now - lastTime ;
        lastTime = now ;
        totalTime += delta  ;
        updateTime += delta ;
    }
    
    
    /**
    *@brief : Accesseur qui permet d'obtenir la difference de temps entre maintenant et le lancement
    **/
    this.getIntervalle = function ()
    {
        var  now = (new Date()).getTime();
        delta = now - lastTime ;
        lastTime = now ;
        totalTime += delta  ;
        updateTime += delta ;
        return updateTime;
    }


//end of class
}
