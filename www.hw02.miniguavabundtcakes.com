server {
	listen 80;
	listen [::]:80;

	root /home/brian/www/hw02;

	index index.html index.htm index.nginx-debian.html;

	server_name hw02.miniguavabundtcakes.com www.hw02.miniguavabundtcakes.com;

	location / {
		try_files $uri $uri/ =404;
	}

}
