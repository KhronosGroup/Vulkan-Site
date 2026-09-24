# VK_KHR_deferred_host_operations(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_deferred_host_operations.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_deferred_host_operations](#VK_KHR_deferred_host_operations)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Code Examples](#_code_examples)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_deferred_host_operations - device extension

**Name String**

`VK_KHR_deferred_host_operations`

**Extension Type**

Device extension

**Registered Extension Number**

269

**Revision**

4

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Josh Barczak [jbarczak](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_deferred_host_operations] @jbarczak%0A*Here describe the issue or question you have about the VK_KHR_deferred_host_operations extension*)

**Last Modified Date**

2020-11-12

**IP Status**

No known IP claims.

**Contributors**

* 
Joshua Barczak, Intel

* 
Jeff Bolz, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Slawek Grajewski, Intel

* 
Tobias Hector, AMD

* 
Yuriy O’Donnell, Epic

* 
Eric Werness, NVIDIA

* 
Baldur Karlsson, Valve

* 
Jesse Barker, Unity

* 
Contributors to VK_KHR_acceleration_structure,
VK_KHR_ray_tracing_pipeline

The `[VK_KHR_deferred_host_operations](#)` extension defines the
infrastructure and usage patterns for deferrable commands, but does not
specify any commands as deferrable.
This is left to additional dependent extensions.
Commands **must** not be deferred unless the deferral is specifically allowed
by another extension which depends on
`[VK_KHR_deferred_host_operations](#)`.

* 
[VkDeferredOperationKHR](VkDeferredOperationKHR.html)

* 
[vkCreateDeferredOperationKHR](vkCreateDeferredOperationKHR.html)

* 
[vkDeferredOperationJoinKHR](vkDeferredOperationJoinKHR.html)

* 
[vkDestroyDeferredOperationKHR](vkDestroyDeferredOperationKHR.html)

* 
[vkGetDeferredOperationMaxConcurrencyKHR](vkGetDeferredOperationMaxConcurrencyKHR.html)

* 
[vkGetDeferredOperationResultKHR](vkGetDeferredOperationResultKHR.html)

* 
`VK_KHR_DEFERRED_HOST_OPERATIONS_EXTENSION_NAME`

* 
`VK_KHR_DEFERRED_HOST_OPERATIONS_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_DEFERRED_OPERATION_KHR](VkObjectType.html)

Extending [VkResult](VkResult.html):

* 
[VK_OPERATION_DEFERRED_KHR](VkResult.html)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](VkResult.html)

* 
[VK_THREAD_DONE_KHR](VkResult.html)

* 
[VK_THREAD_IDLE_KHR](VkResult.html)

The following examples will illustrate the concept of deferrable operations
using a hypothetical example.
The command `vkDoSomethingExpensive` denotes a deferrable command.

The following example illustrates how a vulkan application might request
deferral of an expensive operation:

// create a deferred operation
VkDeferredOperationKHR hOp;
VkResult result = vkCreateDeferredOperationKHR(device, pCallbacks, &hOp);
assert(result == VK_SUCCESS);

result = vkDoSomethingExpensive(device, hOp, ...);
assert( result == VK_OPERATION_DEFERRED_KHR );

// operation was deferred.  Execute it asynchronously
std::async::launch(
    [ hOp ] ( )
    {
        vkDeferredOperationJoinKHR(device, hOp);

        result = vkGetDeferredOperationResultKHR(device, hOp);

        // deferred operation is now complete.  'result' indicates success or failure

        vkDestroyDeferredOperationKHR(device, hOp, pCallbacks);
    }
);

The following example illustrates extracting concurrency from a single
deferred operation:

// create a deferred operation
VkDeferredOperationKHR hOp;
VkResult result = vkCreateDeferredOperationKHR(device, pCallbacks, &hOp);
assert(result == VK_SUCCESS);

result = vkDoSomethingExpensive(device, hOp, ...);
assert( result == VK_OPERATION_DEFERRED_KHR );

// Query the maximum amount of concurrency and clamp to the desired maximum
uint32_t numLaunches = std::min(vkGetDeferredOperationMaxConcurrencyKHR(device, hOp), maxThreads);

std::vector > joins;

for (uint32_t i = 0; i 

The following example shows a subroutine which guarantees completion of a
deferred operation, in the presence of multiple worker threads, and returns
the result of the operation.

VkResult FinishDeferredOperation(VkDeferredOperationKHR hOp)
{
    // Attempt to join the operation until the implementation indicates that we should stop

    VkResult result = vkDeferredOperationJoinKHR(device, hOp);
    while( result == VK_THREAD_IDLE_KHR )
    {
        std::this_thread::yield();
        result = vkDeferredOperationJoinKHR(device, hOp);
    }

    switch( result )
    {
    case VK_SUCCESS:
        {
            // deferred operation has finished.  Query its result.
            result = vkGetDeferredOperationResultKHR(device, hOp);
        }
        break;

    case VK_THREAD_DONE_KHR:
        {
            // deferred operation is being wrapped up by another thread
            //  wait for that thread to finish
            do
            {
                std::this_thread::yield();
                result = vkGetDeferredOperationResultKHR(device, hOp);
            } while( result == VK_NOT_READY );
        }
        break;

    default:
        assert(false); // other conditions are illegal.
        break;
    }

    return result;
}

Should this extension have a VkPhysicalDevice*FeaturesKHR structure?

**RESOLVED**: No.
This extension does not add any functionality on its own and requires a
dependent extension to actually enable functionality and thus there is no
value in adding a feature structure.
If necessary, any dependent extension could add a feature boolean if it
wanted to indicate that it is adding optional deferral support.

* 
Revision 1, 2019-12-05 (Josh Barczak, Daniel Koch)

Initial draft.

Revision 2, 2020-03-06 (Daniel Koch, Tobias Hector)

* 
Add missing VK_OBJECT_TYPE_DEFERRED_OPERATION_KHR enum

* 
fix sample code

* 
Clarified deferred operation parameter lifetimes (#2018,!3647)

Revision 3, 2020-05-15 (Josh Barczak)

* 
Clarify behavior of vkGetDeferredOperationMaxConcurrencyKHR, allowing
it to return 0 if the operation is complete (#2036,!3850)

Revision 4, 2020-11-12 (Tobias Hector, Daniel Koch)

* 
Remove VkDeferredOperationInfoKHR and change return value semantics
when deferred host operations are in use (#2067,3813)

* 
clarify return value of vkGetDeferredOperationResultKHR (#2339,!4110)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_deferred_host_operations).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
