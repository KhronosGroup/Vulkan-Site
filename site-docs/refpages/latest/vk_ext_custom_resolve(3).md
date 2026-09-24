# VK_EXT_custom_resolve(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_custom_resolve.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_custom_resolve](#VK_EXT_custom_resolve)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_custom_resolve - device extension

**Name String**

`VK_EXT_custom_resolve`

**Extension Type**

Device extension

**Registered Extension Number**

629

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_custom_resolve] @zmike%0A*Here describe the issue or question you have about the VK_EXT_custom_resolve extension*)

**Extension Proposal**

[VK_EXT_custom_resolve](../../../../features/latest/features/proposals/VK_EXT_custom_resolve.html)

**Last Modified Date**

2025-05-13

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`

* 
This extension interacts with
`[VK_EXT_dynamic_rendering_unused_attachments](VK_EXT_dynamic_rendering_unused_attachments.html)`

* 
This extension interacts with `[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html)`

* 
This extension interacts with `[VK_EXT_graphics_pipeline_library](VK_EXT_graphics_pipeline_library.html)`

* 
This extension interacts with `[VK_EXT_shader_object](VK_EXT_shader_object.html)`

**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Connor Abbott, Valve

* 
Samuel Pitoiset, Valve

* 
Matthew Netsch, Qualcomm

* 
Jan-Harald Fredriksen, ARM

* 
Ting Wei, ARM

* 
Ricardo Garcia, Igalia

* 
Spencer Fricke, LunarG

* 
Piers Daniell, Nvidia

This extension provides functionality for using shaders to resolve
multisample rendering attachments.

It builds upon mechanics introduced by VK_QCOM_render_pass_shader_resolve,
additionally adding support for dynamic rendering.

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
[vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceCustomResolveFeaturesEXT](VkPhysicalDeviceCustomResolveFeaturesEXT.html)

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
[VkBeginCustomResolveInfoEXT](VkBeginCustomResolveInfoEXT.html)

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html):

[VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html)

* 
`VK_EXT_CUSTOM_RESOLVE_EXTENSION_NAME`

* 
`VK_EXT_CUSTOM_RESOLVE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_RESOLVE_FEATURES_EXT](VkStructureType.html)

Extending [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html):

* 
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](VkSubpassDescriptionFlagBits.html)

* 
[VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](VkSubpassDescriptionFlagBits.html)

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkRenderingFlagBits](VkRenderingFlagBits.html):

[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](VkRenderingFlagBits.html)

* 
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](VkRenderingFlagBits.html)

Extending [VkResolveModeFlagBits](VkResolveModeFlagBits.html):

* 
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BEGIN_CUSTOM_RESOLVE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CUSTOM_RESOLVE_CREATE_INFO_EXT](VkStructureType.html)

1) How will this work with shader objects?

Some vendors emit an epilog at the end of the FS that stores each
color/depth/stencil attachment to the appropriate tilebuffer location, and
to do that they need to know the layout of the tilebuffer which depends on
the attachment formats/sample counts.
We agreed that for shader object the FS epilog is emitted dynamically when
the draw happens.

* 
Revision 1, 2025-05-13 (Mike Blumenkrantz)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_custom_resolve).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
