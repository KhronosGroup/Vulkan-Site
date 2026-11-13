# VK_NV_present_barrier(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_present_barrier.html

## Table of Contents

- [Name](#_name)
- [VK_NV_present_barrier](#VK_NV_present_barrier)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_present_barrier - device extension

**Name String**

`VK_NV_present_barrier`

**Extension Type**

Device extension

**Registered Extension Number**

293

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_surface](VK_KHR_surface.html)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

and

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Contact**

* 
Liya Li [liyli](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_present_barrier] @liyli%0A*Here describe the issue or question you have about the VK_NV_present_barrier extension*)

**Last Modified Date**

2022-05-16

**Contributors**

* 
Liya Li, Nvidia

* 
Martin Schwarzer, Nvidia

* 
Andy Wolf, Nvidia

* 
Ian Williams, Nvidia

* 
Ben Morris, Nvidia

* 
James Jones, Nvidia

* 
Jeff Juliano, Nvidia

This extension adds support for synchronizing corresponding presentation
requests across multiple swapchains using the *present barrier*.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePresentBarrierFeaturesNV](VkPhysicalDevicePresentBarrierFeaturesNV.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkSurfaceCapabilitiesPresentBarrierNV](VkSurfaceCapabilitiesPresentBarrierNV.html)

Extending [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html):

* 
[VkSwapchainPresentBarrierCreateInfoNV](VkSwapchainPresentBarrierCreateInfoNV.html)

* 
`VK_NV_PRESENT_BARRIER_EXTENSION_NAME`

* 
`VK_NV_PRESENT_BARRIER_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_BARRIER_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_BARRIER_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_BARRIER_CREATE_INFO_NV](VkStructureType.html)

1) Is there a query interface to check if a swapchain is using the present
barrier?

**RESOLVED**.
There is no such query interface.
When creating a swapchain, an application can specify to use the *present
barrier*, and if the swapchain is created successfully, this swapchain will
be using the present barrier.

2) Do we need an extra interface to set up the present barrier across
distributed systems?

**RESOLVED**.
If the required hardware is presented in the system, and all settings for
the physical synchronization with other systems are set up, an
implementation manages the configuration automatically when creating a
swapchain, without any extra calls from the application.

* 
Revision 1, 2022-07-20

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_present_barrier).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
