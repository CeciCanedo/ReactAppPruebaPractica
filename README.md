# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## SOLICITUD API CON PHP
<?php

require_once('vendor/autoload.php');

use GuzzleHttp\Client;
header("Access-Control-Allow-Origin: http://localhost:3001");

$searchTerm = $_GET['search'];
$client = new Client();


$moviesData=[];

$response = $client->request('GET', 'https://api.themoviedb.org/3/search/movie', [
  'query'=>[
    'query'=>$searchTerm,
    'include_adult'=> false,
    'language'=> 'en-US',
    'page'=>1,
  ],
    'headers' => [
        'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGU2NmUxZWU4YWE5NjI3OTc1MTdiMWVjNzhhOTAwNSIsInN1YiI6IjY1OTliNjE0MWRiYzg4MDI1NTg2YmYwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xh2GNq8gEHf7_htpcowi-mpj5tpRHj8ZniYNvFFNTs8', 
        'Accept' => 'application/json',

    ],
]);

// Obtener el cuerpo de la respuesta y convertirlo a un arreglo asociativo
$data = json_decode($response->getBody(), true);

// Verificar si hay resultados
if (isset($data['results']) && !empty($data['results'])) {
    $movies = $data['results'];

    $moviesData=[];
    // Recorrer cada película
    foreach ($movies as $movie) {
        // Obtenemos los datos específicos
        $title = $movie['title'];
        $id = $movie['id'];
        $release_year = $movie['release_date'];
        $vote_average = $movie['vote_average'];
        $genre_ids = $movie['genre_ids'];
        $overview = $movie['overview'];
        $poster_path = $movie['poster_path'];
        $original_language= $movie['original_language'];

         // Comprueba si hay una URL de póster válida
         if ($poster_path) {
          // Construye la URL completa de la imagen del póster
          $full_poster_url = 'https://image.tmdb.org/t/p/w500' . $poster_path;

          $moviesData[]=[
            'id'=> $id,
            'title'=> $title,
            'release_year'=> $release_year,
            'vote_average'=> $vote_average,
            'overview'=> $overview,
            'poster_url'=> $full_poster_url,
            'genre_ids'=> $genre_ids,
            'original_language' => $original_language,
            
          ];
        }
      }
    }  

header('Content-Type: application/json');
echo json_encode($moviesData);
exit(); // Detiene cualquier otra salida que no sea el JSON

?>
