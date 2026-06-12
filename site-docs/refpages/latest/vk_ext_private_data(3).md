# VK_EXT_private_data(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_private_data.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_private_data](#VK_EXT_private_data)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Examples](#_examples)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_private_data - device extension

**Name String**

`VK_EXT_private_data`

**Extension Type**

Device extension

**Registered Extension Number**

296

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Matthew Rusch [mattruschnv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_private_data] @mattruschnv%0A*Here describe the issue or question you have about the VK_EXT_private_data extension*)

**Last Modified Date**

2020-03-25

**IP Status**

No known IP claims.

**Contributors**

* 
Matthew Rusch, NVIDIA

* 
Nuno Subtil, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension is a device extension which enables attaching arbitrary
payloads to Vulkan objects.
It introduces the idea of private data slots as a means of storing a 64-bit
unsigned integer of application-defined data.
Private data slots can be created or destroyed any time an associated device
is available.
Private data slots can be reserved at device creation time, and limiting use
to the amount reserved will allow the extension to exhibit better
performance characteristics.

* 
[VkPrivateDataSlotEXT](VkPrivateDataSlot.html)

* 
[vkCreatePrivateDataSlotEXT](vkCreatePrivateDataSlot.html)

* 
[vkDestroyPrivateDataSlotEXT](vkDestroyPrivateDataSlot.html)

* 
[vkGetPrivateDataEXT](vkGetPrivateData.html)

* 
[vkSetPrivateDataEXT](vkSetPrivateData.html)

* 
[VkPrivateDataSlotCreateInfoEXT](VkPrivateDataSlotCreateInfo.html)

* 
Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkDevicePrivateDataCreateInfoEXT](VkDevicePrivateDataCreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevicePrivateDataFeaturesEXT](VkPhysicalDevicePrivateDataFeatures.html)

* 
[VkPrivateDataSlotCreateFlagsEXT](VkPrivateDataSlotCreateFlags.html)

* 
`VK_EXT_PRIVATE_DATA_EXTENSION_NAME`

* 
`VK_EXT_PRIVATE_DATA_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_PRIVATE_DATA_SLOT_EXT](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
In progress

(1) If I have to create a [VkPrivateDataSlot](VkPrivateDataSlot.html) to store and retrieve data
on an object, how does this extension help me? Will I not need to store the
[VkPrivateDataSlot](VkPrivateDataSlot.html) mapping with each object, and if I am doing that, I
might as well just store the original data!

The [VkPrivateDataSlot](VkPrivateDataSlot.html) can be thought of as an opaque index into
storage that is reserved in each object.
That is, you can use the same [VkPrivateDataSlot](VkPrivateDataSlot.html) with each object for a
specific piece of information.
For example, if a layer wishes to track per-object information, the layer
only needs to allocate one [VkPrivateDataSlot](VkPrivateDataSlot.html) per device and it can use
that private data slot for all of the device’s child objects.
This allows multiple layers to store private data without conflicting with
each other’s and/or the application’s private data.

2) What if I need to store more than 64-bits of information per object?

The data that you store per object could be a pointer to another object or
structure of your own allocation.

* 
Revision 1, 2020-01-15 (Matthew Rusch)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_private_data).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
