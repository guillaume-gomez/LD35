var PARTICLES_PER_CHARACTER = 50;

PointOfInterest = function(x, y) {
    this.orbit = 50;
    this.position = { x: x, y: y };
    this.dragging = false;
    this.direction = Math.round( Math.random()-0.5 );
    this.connections = 0;
    this.size = 1;
}

Particle = function(x, y) {
    this.size = 1+Math.random()*4;
    this.position = { x: x, y: y };
    this.shift = { x: x, y: y };
    this.angle = 0;
    this.speed = 0.01+Math.random()*0.06;
    this.force = 1 - (Math.random()*0.05);
    this.fillColor = '#ffffff';
    this.orbit = 1;
}

Particles = function(position) {
    this.pointOfInterest = new PointOfInterest(position.x, position.y);
    this.particles = [];
    this.createParticles(position);
}

Particles.prototype.createParticles = function(position ) {
    for (var i = 0; i < PARTICLES_PER_CHARACTER; i++) {
      var p = new Particle(position.x, position.y);
      this.particles.push( p );
    }
}


Particles.prototype.draw = function(viewport, pointInterest) {
    // Render the particles
    for (i = 0, ilen = this.particles.length; i < ilen; i++) {
        particle = this.particles[i];
        
        var currentDistance = -1;
        var closestDistance = -1;
        var closestPointOfInterest = null;
        this.pointOfInterest.position.x = pointInterest.x;
        this.pointOfInterest.position.y = pointInterest.y;
        this.pointOfInterest.orbit = pointInterest.orbit;
        
        // For each particle, we check what the closes magnet is        
        currentDistance = distanceBetween( particle.position, this.pointOfInterest.position ) - ( this.pointOfInterest.orbit * 0.5 );
        
        if( closestPointOfInterest == null || currentDistance < closestDistance ) {
            closestDistance = currentDistance;
            closestPointOfInterest = this.pointOfInterest;
        }
        
        closestPointOfInterest.connections += 1;
        
        // Rotation
        particle.angle += particle.speed;
        
        // Translate towards the point of interest position
        particle.shift.x += ( closestPointOfInterest.position.x - particle.shift.x) * particle.speed;
        particle.shift.y += ( closestPointOfInterest.position.y - particle.shift.y) * particle.speed;
        
        // Appy the combined position including shift, angle and orbit
        particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit*particle.force);
        particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * (particle.orbit*particle.force);
        
        // Limit to screen bounds
        particle.position.x = Math.max( Math.min( particle.position.x, viewport.x + 2 * viewport.width ), 0 );
        particle.position.y = Math.max( Math.min( particle.position.y, viewport.y + 2 * viewport.height ), 0 );
        
        // Slowly inherit the cloest magnets orbit
        particle.orbit += ( closestPointOfInterest.orbit - particle.orbit ) * 0.05;
        
        jaws.context.beginPath();
        jaws.context.fillStyle = particle.fillColor;
        jaws.context.arc(particle.position.x - viewport.x, particle.position.y - viewport.y, particle.size/2, 0, Math.PI*2, true);
        jaws.context.fill();
    }
}