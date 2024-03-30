<script lang="ts">
  import { page } from '$app/stores';
  import IconButton from '@smui/icon-button';
  import TopAppBar, { Row, Section } from '@smui/top-app-bar';
  import logo from '$lib/images/logo2-text-only.png';
  import faces from '$lib/images/android-chrome-192x192.png';
  import Menu from '@smui/menu';
  import List, { Item, Text } from '@smui/list';
  let menu: Menu;

  let navgiateTo = (path: string) => {
    window.location.href = path;
  };
</script>

<TopAppBar variant="static" prominent={false} dense={false} color={'primary'}>
  <Row>
    <Section class="flex justify-between">
      <div>
        <IconButton on:click={() => menu.setOpen(true)} class="material-icons">menu</IconButton>
        <Menu bind:this={menu}>
          <List>
            <Item on:SMUI:action={() => navgiateTo('/meet/create')}>
              <Text>מפגש חדש</Text>
            </Item>
            <Item on:SMUI:action={() => navgiateTo('/contactus')}>
              <Text>צרו קשר</Text>
            </Item>
          </List>
        </Menu>
      </div>
      <img width="200px" src={logo} alt="logo" />
      <a href="/">
        <img width="40px" src={faces} alt="logo" />
      </a>
    </Section>
  </Row>
</TopAppBar>
