<script lang="ts">
    import { Preferences } from "@capacitor/preferences";
    import { writable } from "svelte/store";
    import {
        onMount,
    } from "svelte";

    const getLanguage = async () => {
        const { value } = await Preferences.get({ key: "language" });
        return value;
    };

    const language = writable('' as string | null);

    const toggleLanguage = async () => {
        const currentLang = await getLanguage();
        const updatedLang = currentLang === "en"  ? "mm" : "en";
        language.set(updatedLang);
    };

    onMount(() => {
        getLanguage().then(lang => language.set(lang));
        
        language.subscribe(async (value) => {
            await Preferences.set({
                key: "language",
                value: value!,
            });
        })
    });
</script>

<h1>Settings</h1>

<div>Language: {$language}</div>
<button on:click={toggleLanguage}>Toggle Language</button>