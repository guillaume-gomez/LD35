/**
* @brief : Classe qui gere les sons
**/

function Sound ( title  , Alttile)
{
    /////////////////////////////////////////
    // Attributs
    /////////////////////////////////////////
    var m_audio;
    var m_title;
    var m_readAble;
    
    /////////////////////////////////////////
    // Méthodes 
    /////////////////////////////////////////
    
    /**
    * @brief : Constructeur de la classe Sound
    **/
    this.constructor = function ()
    {
        if ( playsOGG() )
        {
            m_title = title;
        }
        else if ( playsMP3() )
        {
            m_title = Alttile;
        }
        m_readAble = true ;
        m_audio = jaws.assets.get(m_title);
    }
    
    /**
    * @brief : Lance la musique
    **/
    this.play = function ()
    {
        if ( m_readAble ) 
        m_audio.play();
    }
    
    /**
    * @brief : Pause
    **/
    this.pause = function ()
    {
        m_audio.pause();
    }
    
    /**
    * @brief : Gestion de touche 
    **/
    this.update = function ()
    {
            if (jaws.pressed("ctrl"))
        { 
            m_audio.play();
        }
        
        if (jaws.pressed("s"))
        { 
            m_audio.pause();
        }
    
    }
    
    /**
    * @brief : Accesseur de readable
    **/
    this.getReadable = function ()
    {
        return m_readAble;
    }
    
    /**
    *@brief : Accesseur de readable
    **/
    this.setReadable = function ( value )
    {
        m_readAble = value ;
    }
    
    /**
    *@brief : Stop le son
    **/
    this.stop = function ()
    {
        m_readAble = false ;
    }

//end of class
}
