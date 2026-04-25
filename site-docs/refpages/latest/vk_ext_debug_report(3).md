# VK_EXT_debug_report(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_debug_report.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_debug_report](#VK_EXT_debug_report)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Function Pointers](#_new_function_pointers)
- [New_Function_Pointers](#_new_function_pointers)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_debug_report - instance extension

**Name String**

`VK_EXT_debug_report`

**Extension Type**

Instance extension

**Registered Extension Number**

12

**Revision**

10

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**API Interactions**

* 
Interacts with VK_VERSION_1_1

**Deprecation State**

* 
*Deprecated* by
[VK_EXT_debug_utils](VK_EXT_debug_utils.html)
extension

**Special Use**

* 
[Debugging tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Courtney Goeltzenleuchter [courtney-g](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_debug_report] @courtney-g%0A*Here describe the issue or question you have about the VK_EXT_debug_report extension*)

**Last Modified Date**

2020-12-14

**IP Status**

No known IP claims.

**Contributors**

* 
Courtney Goeltzenleuchter, LunarG

* 
Dan Ginsburg, Valve

* 
Jon Ashburn, LunarG

* 
Mark Lobodzinski, LunarG

Due to the nature of the Vulkan interface, there is very little error
information available to the developer and application.
By enabling optional validation layers and using the `VK_EXT_debug_report`
extension, developers **can** obtain much more detailed feedback on the
application’s use of Vulkan.
This extension defines a way for layers and the implementation to call back
to the application for events of interest to the application.

* 
[VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html)

* 
[vkCreateDebugReportCallbackEXT](vkCreateDebugReportCallbackEXT.html)

* 
[vkDebugReportMessageEXT](vkDebugReportMessageEXT.html)

* 
[vkDestroyDebugReportCallbackEXT](vkDestroyDebugReportCallbackEXT.html)

* 
Extending [VkInstanceCreateInfo](VkInstanceCreateInfo.html):

[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html)

* 
[PFN_vkDebugReportCallbackEXT](PFN_vkDebugReportCallbackEXT.html)

* 
[VkDebugReportFlagBitsEXT](VkDebugReportFlagBitsEXT.html)

* 
[VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html)

* 
[VkDebugReportFlagsEXT](VkDebugReportFlagsEXT.html)

* 
`VK_EXT_DEBUG_REPORT_EXTENSION_NAME`

* 
`VK_EXT_DEBUG_REPORT_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT](VkObjectType.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_VALIDATION_FAILED_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEBUG_REPORT_CREATE_INFO_EXT](VkStructureType.html)

If [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_EXT](VkDebugReportObjectTypeEXT.html)

* 
[VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_EXT](VkDebugReportObjectTypeEXT.html)

`VK_EXT_debug_report` allows an application to register multiple callbacks
with the validation layers.
Some callbacks may log the information to a file, others may cause a debug
break point or other application-defined behavior.
An application **can** register callbacks even when no validation layers are
enabled, but they will only be called for loader and, if implemented, driver
events.

To capture events that occur while creating or destroying an instance an
application **can** link a [VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html) structure
to the `pNext` chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure passed
to [vkCreateInstance](vkCreateInstance.html).

Example uses: Create three callback objects.
One will log errors and warnings to the debug console using Windows
`OutputDebugString`.
The second will cause the debugger to break at that callback when an error
happens and the third will log warnings to stdout.

    VkResult res;
    VkDebugReportCallbackEXT cb1, cb2, cb3;

    VkDebugReportCallbackCreateInfoEXT callback1 = {
        .sType = VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = VK_DEBUG_REPORT_ERROR_BIT_EXT |
                 VK_DEBUG_REPORT_WARNING_BIT_EXT,
        .pfnCallback = myOutputDebugString,
        .pUserData = NULL
    };
    res = vkCreateDebugReportCallbackEXT(instance, &callback1, &cb1);
    if (res != VK_SUCCESS)
       /* Do error handling for VK_ERROR_OUT_OF_MEMORY */

    callback.flags = VK_DEBUG_REPORT_ERROR_BIT_EXT;
    callback.pfnCallback = myDebugBreak;
    callback.pUserData = NULL;
    res = vkCreateDebugReportCallbackEXT(instance, &callback, &cb2);
    if (res != VK_SUCCESS)
       /* Do error handling for VK_ERROR_OUT_OF_MEMORY */

    VkDebugReportCallbackCreateInfoEXT callback3 = {
        .sType = VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT,
        .pNext = NULL,
        .flags = VK_DEBUG_REPORT_WARNING_BIT_EXT,
        .pfnCallback = mystdOutLogger,
        .pUserData = NULL
    };
    res = vkCreateDebugReportCallbackEXT(instance, &callback3, &cb3);
    if (res != VK_SUCCESS)
       /* Do error handling for VK_ERROR_OUT_OF_MEMORY */

    ...

    /* remove callbacks when cleaning up */
    vkDestroyDebugReportCallbackEXT(instance, cb1);
    vkDestroyDebugReportCallbackEXT(instance, cb2);
    vkDestroyDebugReportCallbackEXT(instance, cb3);

|  | In the initial release of the `VK_EXT_debug_report` extension, the token
| --- | --- |
[VK_STRUCTURE_TYPE_DEBUG_REPORT_CREATE_INFO_EXT](VkStructureType.html) was used.
Starting in version 2 of the extension branch,
[VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT](VkStructureType.html) is used
instead for consistency with Vulkan naming rules.
The older enum is still available for backwards compatibility. |

|  | In the initial release of the `VK_EXT_debug_report` extension, the token
| --- | --- |
[VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_EXT](VkDebugReportObjectTypeEXT.html) was used.
Starting in version 8 of the extension branch,
[VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT_EXT](VkDebugReportObjectTypeEXT.html) is used
instead for consistency with Vulkan naming rules.
The older enum is still available for backwards compatibility. |

1) What is the hierarchy / seriousness of the message flags? E.g.
`ERROR` > `WARN` > `PERF_WARN` …​

**RESOLVED**: There is no specific hierarchy.
Each bit is independent and should be checked via bitwise AND.
For example:

    if (localFlags & VK_DEBUG_REPORT_ERROR_BIT_EXT) {
        process error message
    }
    if (localFlags & VK_DEBUG_REPORT_DEBUG_BIT_EXT) {
        process debug message
    }

The validation layers do use them in a hierarchical way (`ERROR` >
`WARN` > `PERF`, `WARN` > `DEBUG` > `INFO`) and they (at
least at the time of this writing) only set one bit at a time.
But it is not a requirement of this extension.

It is possible that a layer may intercept and change, or augment the flags
with extension values the application’s debug report handler may not be
familiar with, so it is important to treat each flag independently.

2) Should there be a VU requiring
[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html)::`flags` to be non-zero?

**RESOLVED**: It may not be very useful, but we do not need VU statement
requiring the `VkDebugReportCallbackCreateInfoEXT`::`msgFlags` at
create-time to be non-zero.
One can imagine that apps may prefer it as it allows them to set the mask as
desired - including nothing - at runtime without having to check.

3) What is the difference between [VK_DEBUG_REPORT_DEBUG_BIT_EXT](VkDebugReportFlagBitsEXT.html) and
[VK_DEBUG_REPORT_INFORMATION_BIT_EXT](VkDebugReportFlagBitsEXT.html)?

**RESOLVED**: [VK_DEBUG_REPORT_DEBUG_BIT_EXT](VkDebugReportFlagBitsEXT.html) specifies information that
could be useful debugging the Vulkan implementation itself.

4) How do you compare handles returned by the debug_report callback to the
application’s handles?

**RESOLVED**: Due to the different nature of dispatchable and nondispatchable
handles there is no generic way (that we know of) that works for common C
and C++ compilers in both 32-bit and 64-bit ABIs.
We recommend applications use the same cast that the validation layers use:

+

reinterpret_cast(dispatchableHandle)
(uint64_t)(nondispatchableHandle)

+
This does require that the application treat dispatchable and
nondispatchable handles differently.

* 
Revision 1, 2015-05-20 (Courtney Goetzenleuchter)

Initial draft, based on LunarG KHR spec, other KHR specs

Revision 2, 2016-02-16 (Courtney Goetzenleuchter)

* 
Update usage, documentation

Revision 3, 2016-06-14 (Courtney Goetzenleuchter)

* 
Update VK_EXT_DEBUG_REPORT_SPEC_VERSION to indicate added support for
vkCreateInstance and vkDestroyInstance

Revision 4, 2016-12-08 (Mark Lobodzinski)

* 
Added Display_KHR, DisplayModeKHR extension objects

* 
Added ObjectTable_NVX, IndirectCommandsLayout_NVX extension objects

* 
Bumped spec revision

* 
Retroactively added version history

Revision 5, 2017-01-31 (Baldur Karlsson)

* 
Moved definition of [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) from debug marker
chapter

Revision 6, 2017-01-31 (Baldur Karlsson)

* 
Added VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_KHR_EXT

Revision 7, 2017-04-20 (Courtney Goeltzenleuchter)

* 
Clarify wording and address questions from developers.

Revision 8, 2017-04-21 (Courtney Goeltzenleuchter)

* 
Remove unused enum VkDebugReportErrorEXT

Revision 9, 2017-09-12 (Tobias Hector)

* 
Added interactions with Vulkan 1.1

Revision 10, 2020-12-14 (Courtney Goetzenleuchter)

* 
Add issue 4 discussing matching handles returned by the extension,
based on suggestion in public issue 368.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_debug_report).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
