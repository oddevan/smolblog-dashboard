<script lang="ts">
	import {
		BottomNav,
		BottomNavItem,
		Button,
		Modal,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SpeedDial,
		SpeedDialButton,
		Tooltip
	} from 'flowbite-svelte';
	import type { LayoutData } from './$types';
	import Subnav from '$lib/components/Subnav.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Reader, Inbox, Content, Settings, Status, Reblog } from '$lib/components/Icons/';

	export let data: LayoutData;
	const makePath = (subpath: string) => `/site/${data.currentSite?.handle}${subpath}`;

	let showNewModal = false;
</script>

<div class="flex flex-row h-full space-x-3">
	<div class="w-40 hidden md:block">
		<Sidebar asideClass="w-full">
			<SidebarWrapper>
				<SidebarGroup>
					<SidebarItem label="Reader" href={makePath('/reader')}>
						<Reader slot="icon" />
					</SidebarItem>
					<SidebarItem label="Inbox" href={makePath('/inbox')}>
						<Inbox slot="icon" />
						<svelte:fragment slot="subtext">
							<span
								class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"
								>3</span
							>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Content" href={makePath('/content')}>
						<Content slot="icon" />
					</SidebarItem>
					<SidebarItem label="Settings" href={makePath('/settings')}>
						<Settings slot="icon" />
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>

		<SpeedDial defaultClass="absolute right-3 top-20" tooltip="none" placement="bottom" textOutside>
			{@const textOutsideClass =
				'block absolute left-14 top-1/2 mb-px text-sm font-medium -translate-y-1/2'}
			<SpeedDialButton name="Status">
				<Status />
			</SpeedDialButton>
			<SpeedDialButton name="Reblog">
				<Reblog />
			</SpeedDialButton>
		</SpeedDial>
	</div>
	<div class="grow">
		<Subnav items={$page.data.subnav} />
		<PageTitle />

		<slot />
	</div>
</div>

<BottomNav
	outerDiv="md:hidden w-11/12"
	position="absolute"
	navType="application"
	innerDiv="grid-cols-5"
>
	<BottomNavItem btnName="Reader" appBtnPosition="left" on:click={() => goto(makePath('/reader'))}>
		<Reader />
		<Tooltip arrow={false}>Reader</Tooltip>
	</BottomNavItem>
	<BottomNavItem btnName="Inbox" appBtnPosition="middle" on:click={() => goto(makePath('/inbox'))}>
		<Inbox />
		<Tooltip arrow={false}>Inbox</Tooltip>
	</BottomNavItem>
	<div class="flex items-center justify-center">
		<BottomNavItem
			on:click={() => (showNewModal = true)}
			btnName="Create new item"
			appBtnPosition="custom"
			btnDefault="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary-600 rounded-full hover:bg-primary-700 group focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800"
		>
			<svg
				class="w-6 h-6 text-white"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					clip-rule="evenodd"
					fill-rule="evenodd"
					d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
				/>
			</svg>
			<Tooltip arrow={false}>Create new item</Tooltip>
		</BottomNavItem>
	</div>
	<BottomNavItem
		btnName="Content"
		appBtnPosition="middle"
		on:click={() => goto(makePath('/content'))}
	>
		<Content />
		<Tooltip arrow={false}>Content</Tooltip>
	</BottomNavItem>
	<BottomNavItem
		btnName="Settings"
		appBtnPosition="right"
		on:click={() => goto(makePath('/settings'))}
	>
		<Settings />
		<Tooltip arrow={false}>Settings</Tooltip>
	</BottomNavItem>
</BottomNav>

<Modal bind:open={showNewModal} size="xs">
	<h3>Create new content</h3>
	<div class="grid grid-cols-2 gap-4 place-content-center">
		<Button href="content/new/status">
			<Status /><br />
			Status
		</Button>
		<Button href="content/new/reblog">
			<Reblog /><br />
			Reblog
		</Button>
	</div>
</Modal>
