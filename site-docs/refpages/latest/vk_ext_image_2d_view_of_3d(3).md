# VK_EXT_image_2d_view_of_3d(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_image_2d_view_of_3d.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_image_2d_view_of_3d](#VK_EXT_image_2d_view_of_3d)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_image_2d_view_of_3d - device extension

**Name String**

`VK_EXT_image_2d_view_of_3d`

**Extension Type**

Device extension

**Registered Extension Number**

394

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_maintenance1](VK_KHR_maintenance1.html)

     and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_image_2d_view_of_3d] @zmike%0A*Here describe the issue or question you have about the VK_EXT_image_2d_view_of_3d extension*)

**Extension Proposal**

[VK_EXT_image_2d_view_of_3d](../../../../features/latest/features/proposals/VK_EXT_image_2d_view_of_3d.html)

**Last Modified Date**

2022-02-22

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Piers Daniell, NVIDIA

* 
Spencer Fricke, Samsung

* 
Ricardo Garcia, Igalia

* 
Graeme Leese, Broadcom

* 
Ralph Potter, Samsung

* 
Stu Smith, AMD

* 
Shahbaz Youssefi, Google

* 
Alex Walters, Imagination

This extension allows a single slice of a 3D image to be used as a 2D view
in image descriptors, matching both the functionality of glBindImageTexture
in OpenGL with the `layer` parameter set to true and 2D view binding
provided by the extension EGL_KHR_gl_texture_3D_image.
It is primarily intended to support GL emulation.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceImage2DViewOf3DFeaturesEXT](VkPhysicalDeviceImage2DViewOf3DFeaturesEXT.html)

* 
`VK_EXT_IMAGE_2D_VIEW_OF_3D_EXTENSION_NAME`

* 
`VK_EXT_IMAGE_2D_VIEW_OF_3D_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_2D_VIEW_OF_3D_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2022-03-25 (Mike Blumenkrantz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_image_2d_view_of_3d).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
