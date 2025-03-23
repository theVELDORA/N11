
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, Loader2, FileText, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setSummary(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a document to upload",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // In a real application, this would call an API to process the document
      // For demo purposes, we'll simulate a delay and return a mock summary
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const mockSummary = `
## Document Summary: ${file.name}

This document covers key academic research findings in the field related to ${file.name.split('.')[0]}. 

### Key Points:
- Introduction to theoretical frameworks
- Methodology and research design
- Data analysis and findings
- Conclusions and implications for future research

### Publication Potential:
This document could be developed into a journal article for submission to top-tier academic journals in the field.
      `;
      
      setSummary(mockSummary);
      
      toast({
        title: "Document processed successfully",
        description: "Your document summary is ready",
      });
    } catch (error) {
      console.error('Error processing document:', error);
      toast({
        title: "Processing failed",
        description: "There was an error processing your document",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!summary) return;
    
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.split('.')[0]}-summary.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Summary downloaded",
      description: "The document summary has been downloaded successfully"
    });
  };

  return (
    <Card className="w-full shadow-lg border-primary/10 hover:border-primary/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Document Upload & Summary
        </CardTitle>
        <CardDescription>
          Upload academic documents to generate a summarized analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="document" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Upload Document
          </label>
          <Input
            id="document"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
        </div>
        
        {file && (
          <div className="bg-muted/30 p-3 rounded-md">
            <p className="text-sm font-medium">Selected file:</p>
            <p className="text-sm">{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
          </div>
        )}
        
        {summary && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Document Summary</h3>
            <Textarea 
              value={summary} 
              readOnly 
              className="h-[200px] overflow-auto" 
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          onClick={handleUpload} 
          disabled={!file || isProcessing}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Document...
            </>
          ) : (
            <>
              <FileUp className="mr-2 h-4 w-4" />
              Process Document
            </>
          )}
        </Button>
        
        {summary && (
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Summary
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocumentUpload;
