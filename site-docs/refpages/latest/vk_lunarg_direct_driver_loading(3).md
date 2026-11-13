# VK_LUNARG_direct_driver_loading(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_LUNARG_direct_driver_loading.html

## Table of Contents

- [Name](#_name)
- [VK_LUNARG_direct_driver_loading](#VK_LUNARG_direct_driver_loading)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Function Pointers](#_new_function_pointers)
- [New_Function_Pointers](#_new_function_pointers)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_LUNARG_direct_driver_loading - instance extension

**Name String**

`VK_LUNARG_direct_driver_loading`

**Extension Type**

Instance extension

**Registered Extension Number**

460

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Charles Giessen [charles-lunarg](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_LUNARG_direct_driver_loading] @charles-lunarg%0A*Here describe the issue or question you have about the VK_LUNARG_direct_driver_loading extension*)

**Extension Proposal**

[VK_LUNARG_direct_driver_loading](../../../../features/latest/features/proposals/VK_LUNARG_direct_driver_loading.html)

**Last Modified Date**

2022-11-29

**Contributors**

* 
Charles Giessen, LunarG

This extension provides a mechanism for applications to add drivers to the
implementation.
This allows drivers to be included with an application without requiring
installation and is capable of being used in any execution environment, such
as a process running with elevated privileges.

* 
[VkDirectDriverLoadingInfoLUNARG](VkDirectDriverLoadingInfoLUNARG.html)

* 
Extending [VkInstanceCreateInfo](VkInstanceCreateInfo.html):

[VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html)

* 
[PFN_vkGetInstanceProcAddrLUNARG](PFN_vkGetInstanceProcAddrLUNARG.html)

* 
[VkDirectDriverLoadingModeLUNARG](VkDirectDriverLoadingModeLUNARG.html)

* 
[VkDirectDriverLoadingFlagsLUNARG](VkDirectDriverLoadingFlagsLUNARG.html)

* 
`VK_LUNARG_DIRECT_DRIVER_LOADING_EXTENSION_NAME`

* 
`VK_LUNARG_DIRECT_DRIVER_LOADING_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_INFO_LUNARG](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_LIST_LUNARG](VkStructureType.html)

* 
Revision 1, 2022-11-29 (Charles Giessen)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_LUNARG_direct_driver_loading).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
