# VK_KHR_device_group_creation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_device_group_creation.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_device_group_creation](#VK_KHR_device_group_creation)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_device_group_creation - instance extension

**Name String**

`VK_KHR_device_group_creation`

**Extension Type**

Instance extension

**Registered Extension Number**

71

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_device_group_creation] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_device_group_creation extension*)

**Last Modified Date**

2016-10-19

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension provides instance-level commands to enumerate groups of
physical devices, and to create a logical device from a subset of one of
those groups.
Such a logical device can then be used with new features in the
`[VK_KHR_device_group](VK_KHR_device_group.html)` extension.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkEnumeratePhysicalDeviceGroupsKHR](vkEnumeratePhysicalDeviceGroups.html)

* 
[VkPhysicalDeviceGroupPropertiesKHR](VkPhysicalDeviceGroupProperties.html)

* 
Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkDeviceGroupDeviceCreateInfoKHR](VkDeviceGroupDeviceCreateInfo.html)

* 
`VK_KHR_DEVICE_GROUP_CREATION_EXTENSION_NAME`

* 
`VK_KHR_DEVICE_GROUP_CREATION_SPEC_VERSION`

* 
[VK_MAX_DEVICE_GROUP_SIZE_KHR](VK_MAX_DEVICE_GROUP_SIZE.html)

* 
Extending [VkMemoryHeapFlagBits](VkMemoryHeapFlagBits.html):

[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT_KHR](VkMemoryHeapFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES_KHR](VkStructureType.html)

    VkDeviceCreateInfo devCreateInfo = { VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO };
    // (not shown) fill out devCreateInfo as usual.
    uint32_t deviceGroupCount = 0;
    VkPhysicalDeviceGroupPropertiesKHR *props = NULL;

    // Query the number of device groups
    vkEnumeratePhysicalDeviceGroupsKHR(g_vkInstance, &deviceGroupCount, NULL);

    // Allocate and initialize structures to query the device groups
    props = (VkPhysicalDeviceGroupPropertiesKHR *)malloc(deviceGroupCount*sizeof(VkPhysicalDeviceGroupPropertiesKHR));
    for (i = 0; i  1) {
        deviceGroupInfo.physicalDeviceCount = props[0].physicalDeviceCount;
        deviceGroupInfo.pPhysicalDevices = props[0].physicalDevices;
        devCreateInfo.pNext = &deviceGroupInfo;
    }

    vkCreateDevice(props[0].physicalDevices[0], &devCreateInfo, NULL, &g_vkDevice);
    free(props);

* 
Revision 1, 2016-10-19 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_device_group_creation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
