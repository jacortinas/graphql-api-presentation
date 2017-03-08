// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  Code,
  CodePane,
  Deck,
  Heading,
  Image,
  ListItem,
  List,
  Slide,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  postsIndex: require("../assets/posts_index.png"),
  postsShow: require("../assets/posts_show.png")
};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["fade", "slide"]} transitionDuration={500} theme={theme}>
        <Slide>
          <Heading fit>
            Replacing REST with GraphQL
          </Heading>
          <Appear>
            <Text margin="20px 0 0">
              A story of GraphQL, Ruby, React-Native & Apollo.
            </Text>
          </Appear>
        </Slide>

        <Slide>
          <Heading fit>We start with a todo app...</Heading>
        </Slide>

        <Slide>
          <Heading fit>Just kidding!</Heading>
          <Text fit>Let's start with something only slightly more realistic...</Text>
        </Slide>

        <Slide>
          <Heading fit>We start with something like Reddit</Heading>
        </Slide>

        <Slide>
          <Heading fit>Things you can do</Heading>
            <List>
              <Appear><ListItem>View a list of posts</ListItem></Appear>
              <Appear><ListItem>View post details</ListItem></Appear>
              <Appear><ListItem>Upvote/downvote posts</ListItem></Appear>
              <Appear><ListItem>View user details and their posts</ListItem></Appear>
            </List>
        </Slide>

        <Slide>
          <Text>It's ugly</Text>
          <Image width="800" src={images.postsIndex}/>
        </Slide>

        <Slide>
          <Text>Pretty ugly</Text>
          <Image width="800" src={images.postsShow}/>
        </Slide>

        <Slide>
          <CodePane textSize="28" lang="ruby" source={require("raw-loader!../examples/posts_controller_start.example")}/>
        </Slide>

        <Slide>
          <CodePane textSize="28" lang="ruby" source={require("raw-loader!../examples/posts_controller_end.example")}/>
        </Slide>

        <Slide>
          <Heading size={5}>What do we do in the case of an API needing to exist for this resource?</Heading>
        </Slide>

        <Slide>
          <Text>
            A pretty normal thing is to define API specific controllers or even just use automatic
            format rendering provided by Rails. In this particular case, we defined some jbuilder
            templates and rely on format rendering.
          </Text>
        </Slide>

        <Slide>
          <Code>app/views/posts/_post.json.jbuilder</Code>
          <CodePane textSize="30" lang="ruby" source={require("raw-loader!../examples/breadit/app/views/posts/_post.json.jbuilder")}/>
        </Slide>

        <Slide>
          <Text>When a request is made for the JSON of a Post, we return it and it's all good.</Text>
        </Slide>

        <Slide>
          <Text>Notice though, the line that specifies that we render a user with every single post...</Text>
          <CodePane margin="20px 0 0" textSize="30" lang="ruby" source="json.partial! 'users/user', user: post.user"/>
        </Slide>

        <Slide>
          <Text>Do we always need that data?</Text>
        </Slide>

        <Slide>
          <Text>
            It's not for you to decide, it's up to the API consumer to do what they need to do with
            your API response.
          </Text>
        </Slide>

        <Slide>
          <Text>
            Different interfaces are going to require different shapes of data.
          </Text>
        </Slide>

        <Slide>
          <Text>
            Requirements will change.
          </Text>
        </Slide>

        <Slide>
          <Text>
            Old versions of your app are going to exist for a long time.
          </Text>
        </Slide>

        <Slide>
          <Text>
            How quickly can we create a GraphQL API to query all of our data?
          </Text>
        </Slide>

        <Slide>
          <Heading>Live Coding!</Heading>
        </Slide>
      </Deck>
    );
  }
}
