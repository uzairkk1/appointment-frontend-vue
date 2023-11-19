<script setup>
import { ref } from "vue";
import NavMenuItem from "../components/NavMenuItem.vue";

const drawer = ref(false);
const isSubMenuOpen = ref(false);
const isToolbarDetached = ref(false);
const toolbarTheme = ref("light");
const fullName = ref("light");
const username = ref("username");
const showPageLoader = ref(false);
const isContentBoxed = ref(false);

const $t = (s) => s;
const navigation = ref({
  menu: [
    {
      text: "",
      key: "",
      items: [
        {
          icon: "home",
          key: "Menu.Home",
          text: "Home",
          link: "/",
        },
        {
          icon: "apps",
          key: "Menu.Applications",
          text: "Applications",
          link: "/Applications",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "toc",
          key: "Menu.Contents",
          text: "Content",
          regex:
            /^\/posts\/[a-z]*|^\/routes\/[a-z]*|^\/collections\/[a-z]*|^\/pins\/[a-z]*/,
          items: [
            {
              icon: "pin_drop",
              key: "Menu.Routes",
              text: "Routes",
              link: "/routes/all",
            },
            {
              icon: "chrome_reader_mode",
              key: "Menu.News",
              text: "Posts",
              link: "/posts/all",
            },
            {
              icon: "book",
              key: "Menu.Trainings",
              text: "Collections",
              link: "/collections/all",
            },
            {
              icon: "live_help",
              key: "Menu.Augmentation",
              text: "Pins",
              link: "/pins/all",
            },
          ],
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "photo_library",
          key: "Menu.Media_Library",
          text: "Media Library",
          link: "/MediaLibrary",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "hub",
          key: "Menu.Target_Audiences",
          text: "Target Audiences",
          link: "/TargetAudiences",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "group",
          key: "Menu.Users",
          text: "Users",
          link: "/Users",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "workspaces",
          key: "Menu.Workspaces",
          text: "Workspaces",
          link: "/Workspaces",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "settings",
          key: "Menu.Manage_Tenant",
          text: "Manage Tenant",
          link: "/ManageTenant",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "newspaper",
          key: "Menu.Release_News",
          text: "Release News",
          link: "/ReleaseNews",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "recycling",
          key: "Menu.RecycleBin",
          text: "RecycleBin",
          link: "/RecycleBin",
        },
      ],
    },
    {
      text: "",
      key: "",
      items: [
        {
          icon: "logout",
          key: "Menu.Logout",
          text: "Logout",
          link: "/account/logout",
        },
      ],
    },
  ],

  // footer links
  footer: [
    {
      text: "Docs",
      key: "Menu.Docs",
      href: "https://vuetifyjs.com",
      target: "_blank",
    },
  ],
});
</script>
<template>
  <div id="applications_container">
    <template>
      <v-app :class="{ 'anp-menu-closed': !drawer }">
        <!-- Layout component -->
        <!-- <v-snackbar
          class="anp-snackbar-custom"
          v-model="snackbarMDL"
          timeout="10000"
          bottom="bottom"
          :color="color"
        >
          <div class="snackbar-message">
            <div
              v-if="userMessages && userMessages.length > 0"
              v-for="(message, index) in userMessages"
              :key="index"
            >
              <div>
                {{ message }}
              </div>
            </div>
          </div>
          <v-btn
            class="secondary"
            color="white"
            text
            v-on:click="snackbarMDL = false"
          >
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-snackbar> -->
        <template>
          <div class="d-flex flex-grow-1">
            <!-- Navigation -->
            <v-navigation-drawer
              v-bind:width="300"
              v-model="drawer"
              app
              floating
              class="elevation-1"
              :class="{ 'anp-subs-menu-open': isSubMenuOpen }"
              :right="$vuetify.rtl"
            >
              <!-- Navigation menu info -->
              <div class="anp-navigation-drawer-inner">
                <div
                  class="anp-side-toggle-wrapper"
                  :title="!drawer ? $t('Common.Expand') : false"
                >
                  <v-app-bar-nav-icon
                    class="anp-toggler"
                    @@click.stop="drawer = !drawer"
                  ></v-app-bar-nav-icon>

                  <span class="anp-tenant-number-top"
                    >@AppContext.User.TenantId</span
                  >
                </div>

                <!-- <div class="anp-subs-wrapper">
                  @*Subscription selector*@
                  <template>
                    <v-menu
                      v-bind:max-height="300"
                      offset-y
                      left
                      transition="slide-y-transition"
                      v-model="isSubMenuOpen"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="anp-btn-tenant"
                          text
                          :icon="$vuetify.breakpoint.smAndDown"
                          v-on="on"
                        >
                          <template>
                            <span class="anp-tenant-number">
                              {{ selectedSubscriptionId.title }}
                            </span>
                            <v-icon>mdi-chevron-down</v-icon>
                          </template>
                        </v-btn>
                      </template>
                      <v-list dense nav>
                        <v-list-item
                          v-for="sub in allSubscriptions"
                          :key="sub.id"
                          @@click="
                            setSubscriptionId({
                              subscriptionId: sub.id,
                              title: sub.title,
                            })
                          "
                        >
                          <v-list-item-title>
                            {{ sub.title }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </div> -->

                <div class="anp-menu-user-sec">
                  <div class="anp-usermenu-name-sec">
                    @*v-on="on"*@
                    <v-btn icon class="elevation-2 anp-btn-users">
                      <v-badge
                        color="success"
                        dot
                        bordered
                        offset-x="10"
                        offset-y="10"
                      >
                        <v-avatar size="40">
                          <span>{{ username }}</span>
                        </v-avatar>
                      </v-badge>
                    </v-btn>

                    <div class="anp-username-sec">
                      <div class="anp-username">
                        <span>{{ fullName }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Navigation menu -->
                <template>
                  <v-list nav dense>
                    <div v-for="(item, index) in navigation.menu" :key="index">
                      <div
                        v-if="item.key || item.text"
                        class="pa-1 mt-2 overline"
                      >
                        {{ item.text }}
                      </div>
                      <template>
                        <div>
                          <nav-menu-item
                            v-for="(level1Item, level1Index) in item.items"
                            :key="level1Index"
                            :menu-item="level1Item"
                          >
                            <!-- <template v-if="level1Item.items">
                              <nav-menu-item
                                v-for="(
                                  level2Item, level2Index
                                ) in level1Item.items"
                                :key="level2Index"
                                :menu-item="level2Item"
                                v-if="
                                  level2Item.key ==
                                    'Menu.Learning_Collections' ||
                                  level2Item.key != 'Menu.Learning_Collections'
                                "
                                subgroup
                                small
                              >
                                <template v-if="level2Item.items">
                                  <nav-menu-item
                                    v-for="(
                                      level3Item, level3Index
                                    ) in level2Item.items"
                                    :key="level3Index"
                                    :menu-item="level3Item"
                                    small
                                  />
                                </template>
                              </nav-menu-item>
                            </template> -->
                          </nav-menu-item>
                        </div>
                      </template>
                    </div>
                  </v-list>
                </template>

                <template>
                  <div class="pa-2 pt-4 anp-logo-container">
                    <div class="anp-logo">
                      <img src="" />
                      <!-- @*
                      <div class="title font-weight-bold primary--text">
                        {{ product.name }}
                      </div>
                      *@ -->
                    </div>
                    <div class="anp-version-and-lang">
                      <div class="overline grey--text">
                        <span class="anp-vers-label">Vers.:</span>3.1.1
                      </div>

                      <!-- <div class="anp-footer-lang">
                        <template>
                          <v-menu offset-y left transition="slide-y-transition">
                            <template v-slot:activator="{ on }">
                              <v-btn
                                class="anp-btn-language"
                                text
                                :icon="$vuetify.breakpoint.smAndDown"
                                v-on="on"
                              >
                                @*<template>
                                  <span
                                    :class="[
                                      'flag-icon',
                                      `flag-icon-${currentLocale.flag}`,
                                      {
                                        'flag-round':
                                          $vuetify.breakpoint.smAndDown,
                                      },
                                    ]"
                                  ></span> </template
                                >*@
                                <span
                                  v-show="
                                    $vuetify.breakpoint.mdAndUp && showLabel
                                  "
                                  :class="[$vuetify.rtl ? 'mr-1' : 'ml-1']"
                                  >{{ currentLocale.code?.toUpperCase() }}</span
                                >
                                <v-icon>mdi-chevron-down</v-icon>
                              </v-btn>
                            </template>

                            <v-list dense nav>
                              <v-list-item
                                v-for="locale in availableLocales"
                                :key="locale.code"
                                @@click="setLocale(locale.code)"
                              >
                                <template>
                                  <span
                                    :class="[
                                      'flag-icon',
                                      'mr-1',
                                      `flag-icon-${locale.flag}`,
                                    ]"
                                  ></span>
                                </template>
                                <v-list-item-title
                                  >{{ locale.code?.toUpperCase() }}
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </template>
                      </div> -->
                    </div>
                  </div>
                </template>
              </div>
            </v-navigation-drawer>

            <!-- Toolbar For Smaller Screens-->
            <v-app-bar
              app
              class="anp-toolbar-sm"
              :color="isToolbarDetached ? 'surface' : undefined"
              :flat="isToolbarDetached"
              :light="toolbarTheme === 'light'"
              :dark="toolbarTheme === 'dark'"
            >
              <v-card
                class="flex-grow-1 d-flex"
                :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
                :flat="!isToolbarDetached"
              >
                <div class="d-flex flex-grow-1 align-center">
                  <div
                    class="d-flex flex-grow-1 align-center anp-header-topbar-main"
                  >
                    <v-app-bar-nav-icon
                      @@click.stop="drawer = !drawer"
                    ></v-app-bar-nav-icon>
                  </div>
                </div>
              </v-card>
            </v-app-bar>

            <v-main>
              <v-container class="fill-height" :fluid="!isContentBoxed">
                <v-layout>
                  <slot></slot>

                  <anp-page-loader
                    v-bind:loading="showPageLoader"
                  ></anp-page-loader>
                  <div id="componentHolder"></div>
                  <RouterView />
                </v-layout>
              </v-container>

              <v-footer app inset> </v-footer>
            </v-main>
          </div>
        </template>
      </v-app>
    </template>
  </div>
</template>
