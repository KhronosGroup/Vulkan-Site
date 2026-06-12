# VK_VALVE_descriptor_set_host_mapping(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VALVE_descriptor_set_host_mapping.html

## Table of Contents

- [Name](#_name)
- [VK_VALVE_descriptor_set_host_mapping](#VK_VALVE_descriptor_set_host_mapping)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VALVE_descriptor_set_host_mapping - device extension

**Name String**

`VK_VALVE_descriptor_set_host_mapping`

**Extension Type**

Device extension

**Registered Extension Number**

421

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Hans-Kristian Arntzen [HansKristian-Work](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_VALVE_descriptor_set_host_mapping] @HansKristian-Work%0A*Here describe the issue or question you have about the VK_VALVE_descriptor_set_host_mapping extension*)

**Last Modified Date**

2022-02-22

**IP Status**

No known IP claims.

**Contributors**

* 
Hans-Kristian Arntzen, Valve

This extension allows applications to directly query a host pointer for a
[VkDescriptorSet](VkDescriptorSet.html) which **can** be used to copy descriptors between
descriptor sets without the use of an API command.
Memory offsets and sizes for descriptors **can** be queried from a
[VkDescriptorSetLayout](VkDescriptorSetLayout.html) as well.

|  | There is currently no specification language written for this extension.
| --- | --- |
The links to APIs defined by the extension are to stubs that only include
generated content such as API declarations and implicit valid usage
statements. |

|  | This extension is only intended for use in specific embedded environments
| --- | --- |
with known implementation details, and is therefore undocumented. |

* 
[vkGetDescriptorSetHostMappingVALVE](vkGetDescriptorSetHostMappingVALVE.html)

* 
[vkGetDescriptorSetLayoutHostMappingInfoVALVE](vkGetDescriptorSetLayoutHostMappingInfoVALVE.html)

* 
[VkDescriptorSetBindingReferenceVALVE](VkDescriptorSetBindingReferenceVALVE.html)

* 
[VkDescriptorSetLayoutHostMappingInfoVALVE](VkDescriptorSetLayoutHostMappingInfoVALVE.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE](VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE.html)

* 
`VK_VALVE_DESCRIPTOR_SET_HOST_MAPPING_EXTENSION_NAME`

* 
`VK_VALVE_DESCRIPTOR_SET_HOST_MAPPING_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_BINDING_REFERENCE_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_HOST_MAPPING_INFO_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_SET_HOST_MAPPING_FEATURES_VALVE](VkStructureType.html)

* 
Revision 1, 2022-02-22 (Hans-Kristian Arntzen)

Initial specification

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_VALVE_descriptor_set_host_mapping).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
