# VK_KHR_multiview(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_multiview.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_multiview](#VK_KHR_multiview)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New Built-In Variables](#_new_built_in_variables)
- [New_Built-In_Variables](#_new_built_in_variables)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Additional Resources](#_additional_resources)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_multiview - device extension

**Name String**

`VK_KHR_multiview`

**Extension Type**

Device extension

**Registered Extension Number**

54

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_multiview](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_multiview.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_multiview] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_multiview extension*)

**Last Modified Date**

2016-10-28

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_multiview`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_multiview.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension has the same goal as the OpenGL ES `GL_OVR_multiview`
extension.
Multiview is a rendering technique originally designed for VR where it is
more efficient to record a single set of commands to be executed with
slightly different behavior for each “view”.

It includes a concise way to declare a render pass with multiple views, and
gives implementations freedom to render the views in the most efficient way
possible.
This is done with a multiview configuration specified during [render pass](../../../../spec/latest/chapters/renderpass.html#renderpass) creation with the [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) passed
into [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)::`pNext`.

This extension enables the use of the
[`SPV_KHR_multiview`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_multiview.html) shader extension,
which adds a new `ViewIndex` built-in type that allows shaders to control
what to do for each view.
If using GLSL there is also the
[`GL_EXT_multiview`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_multiview.txt) extension that
introduces a `highp int gl_ViewIndex;` built-in variable for vertex,
tessellation, geometry, and fragment shaders.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMultiviewFeaturesKHR](VkPhysicalDeviceMultiviewFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMultiviewPropertiesKHR](VkPhysicalDeviceMultiviewProperties.html)

Extending [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html):

* 
[VkRenderPassMultiviewCreateInfoKHR](VkRenderPassMultiviewCreateInfo.html)

* 
`VK_KHR_MULTIVIEW_EXTENSION_NAME`

* 
`VK_KHR_MULTIVIEW_SPEC_VERSION`

* 
Extending [VkDependencyFlagBits](VkDependencyFlagBits.html):

[VK_DEPENDENCY_VIEW_LOCAL_BIT_KHR](VkDependencyFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_MULTIVIEW_CREATE_INFO_KHR](VkStructureType.html)

* 
[`ViewIndex`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-viewindex)

* 
[`MultiView`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-MultiView)

* 
['NVIDIA
blog post'](https://devblogs.nvidia.com/turing-multi-view-rendering-vrworks)

* 
['ARM
blog post'](https://community.arm.com/developer/tools-software/graphics/b/blog/posts/optimizing-virtual-reality-understanding-multiview)

* 
Revision 1, 2016-10-28 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_multiview).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
