# VK_EXT_multisampled_render_to_swapchain

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_multisampled_render_to_swapchain.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Proposal](#_proposal)
- [3. Issues](#_issues)
- [3.1. How can support for this flag be determined for the exact swapchain format?](#_how_can_support_for_this_flag_be_determined_for_the_exact_swapchain_format)
- [3.1._How_can_support_for_this_flag_be_determined_for_the_exact_swapchain_format?](#_how_can_support_for_this_flag_be_determined_for_the_exact_swapchain_format)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Proposal](#_proposal)
[3. Issues](#_issues)

[3.1. How can support for this flag be determined for the exact swapchain format?](#_how_can_support_for_this_flag_be_determined_for_the_exact_swapchain_format)

This extension brings the functionality of `VK_EXT_multisampled_render_to_single_sampled` to Vulkan swapchains.

Multisampled rendering to single-sampled images is particularly efficient on tiling GPUs.
See the proposal for [`VK_EXT_multisampled_render_to_single_sampled`](#https://docs.vulkan.org/refpages/latest/refpages/source/VK_EXT_multisampled_render_to_single_sampled.adoc) for details.
Such rendering to swapchain images is currently prohibited due to a lack of a create flag equivalent to `VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT`.

This extension simply adds a swapchain create flag that mirrors `VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT`:

VK_SWAPCHAIN_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT

Feature, advertising whether the implementation supports
multisampled-rendering-to-single-sampled for swapchain images:

typedef struct VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multisampledRenderToSwapchain;
} VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT;

To query whether this flag is acceptable in `VkSwapchainCreateInfoKHR::flags` for a given surface, chain an instance of the following struct to `pSurfaceCapabilities` when calling `vkGetPhysicalDeviceSurfaceCapabilities2KHR`.
Any bit, including `VK_SWAPCHAIN_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT`, that is not set in `swapchainSupportedFlags` is not supported when creating a swapchain for the queried surface.
The result of this query is the intersection of supported flags for all present modes unless `VkSurfacePresentModeKHR` is chained to `pSurfaceInfo`, in which case more flags may be supported, limited to the specified present mode and those that are compatible with it (per `VkSurfacePresentModeCompatibilityKHR`).

typedef struct VkSwapchainFlagsSurfaceCapabilitiesEXT {
    VkStructureType            sType;
    void*                      pNext;
    VkSwapchainCreateFlagsKHR  swapchainSupportedFlags;
} VkSwapchainFlagsSurfaceCapabilitiesEXT;

The description of the `vkCreateSwapchainKHR` entry point defines the equivalence between presentable and non-presentable images.
Therefore, applications must use `vkGetPhysicalDeviceImageFormatProperties2` to determine support for `VK_SWAPCHAIN_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT` with a given format by using the equivalent `VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT` flag.
